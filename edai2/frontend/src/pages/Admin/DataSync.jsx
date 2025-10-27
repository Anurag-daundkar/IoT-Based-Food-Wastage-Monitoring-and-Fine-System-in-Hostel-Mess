import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const DataSync = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [studentId, setStudentId] = useState('');
  const [syncResults, setSyncResults] = useState(null);

  const handleSyncStudent = async () => {
    if (!studentId.trim()) {
      setMessage('Please enter a student ID');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/sync/student/${studentId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        setMessage('✅ Student synced successfully!');
        setSyncResults(data.data);
      } else {
        setMessage(`❌ Sync failed: ${data.message}`);
      }
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSyncAll = async () => {
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/sync/all', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        setMessage(`✅ All students synced! ${data.data.syncedCount} successful, ${data.data.failedCount} failed`);
        setSyncResults(data.data);
      } else {
        setMessage(`❌ Sync failed: ${data.message}`);
      }
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Data Synchronization</h1>
          <p className="text-gray-600 mb-6">
            Sync student data from Firebase to MongoDB. Use this when you've manually updated values in Firebase.
          </p>

          {/* Individual Student Sync */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Sync Individual Student</h2>
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student ID
                </label>
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="Enter student ID (e.g., 12311587)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={handleSyncStudent}
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Syncing...' : 'Sync Student'}
              </button>
            </div>
          </div>

          {/* Sync All Students */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-green-800 mb-4">Sync All Students</h2>
            <p className="text-gray-600 mb-4">
              This will sync all students from Firebase to MongoDB. Use with caution as it processes all students.
            </p>
            <button
              onClick={handleSyncAll}
              disabled={loading}
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Syncing All...' : 'Sync All Students'}
            </button>
          </div>

          {/* Status Message */}
          {message && (
            <div className={`p-4 rounded-md mb-6 ${
              message.includes('✅') 
                ? 'bg-green-100 border border-green-300 text-green-800' 
                : 'bg-red-100 border border-red-300 text-red-800'
            }`}>
              {message}
            </div>
          )}

          {/* Sync Results */}
          {syncResults && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Sync Results</h3>
              <pre className="bg-white p-4 rounded border text-sm overflow-auto">
                {JSON.stringify(syncResults, null, 2)}
              </pre>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">Instructions</h3>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              <li>Update student data manually in Firebase console</li>
              <li>Use the sync options above to update MongoDB</li>
              <li>Check the results to verify the sync was successful</li>
              <li>The system will automatically recalculate totals and averages</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSync;
