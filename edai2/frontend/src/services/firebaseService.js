import { ref, set, onValue, get } from 'firebase/database';
import { database } from '../config/firebase';

export const firebaseService = {
    // Update current student ID when throwing waste
    updateCurrentStudent: async (studentId) => {
        try {
            await set(ref(database, 'currentStudent'), {
                id: studentId,
                timestamp: Date.now()
            });
            return true;
        } catch (error) {
            console.error('Error updating current student:', error);
            return false;
        }
    },

    // Listen for waste weight updates
    subscribeToWasteWeight: (callback) => {
        const wasteRef = ref(database, 'wasteData');
        return onValue(wasteRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                callback(data);
            }
        });
    },

    // Get student's total waste data
    getStudentWasteData: async (studentId) => {
        try {
            const wasteRef = ref(database, `students/${studentId}/waste`);
            const snapshot = await get(wasteRef);
            return snapshot.val() || { totalWeight: 0, fineAmount: 0 };
        } catch (error) {
            console.error('Error fetching student waste data:', error);
            return null;
        }
    },

    // Update student's waste data
    updateStudentWasteData: async (studentId, weight) => {
        try {
            const threshold = 500; // 500g threshold
            const finePerGram = 0.1; // ₹0.1 per gram over threshold
            
            // Get current total
            const currentData = await firebaseService.getStudentWasteData(studentId);
            const newTotal = (currentData.totalWeight || 0) + weight;
            const overThreshold = Math.max(0, newTotal - threshold);
            const newFine = overThreshold * finePerGram;

            // Get current date for monthly tracking
            const now = new Date();
            const currentYear = now.getFullYear();
            const currentMonth = now.getMonth() + 1; // JavaScript months are 0-based

            // Update the waste data
            await set(ref(database, `students/${studentId}/waste`), {
                totalWeight: newTotal,
                fineAmount: newFine,
                lastUpdate: Date.now()
            });

            // Update monthly data
            const monthlyRef = ref(database, `students/${studentId}/monthlyData`);
            const monthlySnapshot = await get(monthlyRef);
            let monthlyData = monthlySnapshot.val() || [];

            // Find or create current month's data
            let currentMonthData = monthlyData.find(m => m.year === currentYear && m.month === currentMonth);
            if (!currentMonthData) {
                currentMonthData = {
                    year: currentYear,
                    month: currentMonth,
                    waste: 0,
                    weight: 0,
                    finesCollected: 0,
                    finesPending: 0,
                    totalFines: 0,
                    score: 100
                };
                monthlyData.push(currentMonthData);
            }

            // Update current month's data
            currentMonthData.weight = (currentMonthData.weight || 0) + weight;
            currentMonthData.waste = (currentMonthData.waste || 0) + weight;
            currentMonthData.totalFines = newFine;
            currentMonthData.finesPending = newFine;

            // Save updated monthly data
            await set(monthlyRef, monthlyData);

            return { totalWeight: newTotal, fineAmount: newFine, monthlyData: currentMonthData };
        } catch (error) {
            console.error('Error updating student waste data:', error);
            return null;
        }
    }
};