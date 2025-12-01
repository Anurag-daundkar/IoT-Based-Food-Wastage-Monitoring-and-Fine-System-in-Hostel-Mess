# Waste Measurement and Fine Calculation Workflow

## Overview
This document describes the complete workflow for measuring waste, calculating fines, and syncing data between Arduino (load sensor), Firebase, and MongoDB.

## System Components

### 1. **Arduino/ESP8266 (Sem5_Edai)**
- **Location**: `Sem5_Edai/Sem5_Edai.ino`
- **Role**: 
  - Monitors ultrasonic sensor for user presence
  - Controls servo motor for bin opening/closing
  - Measures waste weight using HX711 load sensor
  - Communicates with Firebase Realtime Database

### 2. **React Face Authentication (react-face-auth-master)**
- **Location**: `react-face-auth-master/src/pages/Login.jsx`
- **Role**:
  - Detects student face and authenticates
  - Sets `check = true` in Firebase when student logs in
  - Student ID and details written to `lastDetected` node

### 3. **Backend Service (edai2/Backend)**
- **Location**: `edai2/Backend/services/firebaseWasteProcessor.js`
- **Role**:
  - Listens for waste weight updates in Firebase
  - Calculates fines based on threshold
  - Updates Firebase with waste and fine data
  - Syncs data to MongoDB

---

## Complete Workflow

### **Phase 1: Face Detection (Login)**

1. Student approaches the smart dustbin
2. Ultrasonic sensor detects presence (distance < 10cm)
3. Arduino sets `solve = true` in Firebase
4. React app auto-starts face recognition camera
5. Face detected and matched with student ID
6. **Firebase Update** (`lastDetected` node):
   ```json
   {
     "id": "123",
     "fullName": "Krishna",
     "picture": "/api/images/68f9cffab5558555e64de4d5",
     "detectedAt": "2025-11-06T13:24:00.244Z",
     "check": true,  // ✅ LOGIN FLAG SET
     "month": {
       "year": 2025,
       "month": 11,
       "waste": 12,
       "finesPending": 0,
       "score": 100,
       ...
     }
   }
   ```

### **Phase 2: Waste Measurement (Arduino)**

1. Arduino detects `check = true` in Firebase
2. **Servo opens** (180°) to allow waste disposal
3. Arduino records **initial weight** from load sensor
4. Student disposes waste
5. Student leaves (face no longer detected OR manually logged out)

### **Phase 3: Logout and Weight Calculation**

**Option A: Automatic Logout (Face Recognition)**
- Face recognition stops detecting the student
- React app calls logout endpoint: `POST /api/sync/logout`

**Option B: Manual Logout**
- Student clicks "Log Out" button in Protected page
- Calls: `POST /api/sync/logout` with `studentId`

**Logout Process:**
1. Backend sets `check = false` in Firebase `lastDetected` node
2. Arduino detects `check = false`
3. **Servo closes** (0°)
4. Arduino measures **final weight** from load sensor
5. Calculates: `measuredWeight = finalWeight - initialWeight`
6. Uploads `measuredWeight` to Firebase:
   ```
   Firebase Path: /lastDetected/month/weight
   Value: measuredWeight (in grams)
   ```

### **Phase 4: Fine Calculation (Backend Service)**

The backend service (`firebaseWasteProcessor.js`) continuously listens for changes to `/lastDetected/month/weight`.

When weight is updated:

1. **Fetch Data**:
   - Get `measuredWeight` from `/lastDetected/month/weight`
   - Get student ID from `/lastDetected/id`
   - Get threshold from `/Threshold/value`
   - Get current month data from `/lastDetected/month`

2. **Calculate Fine**:
   ```javascript
   if (measuredWeight > threshold) {
     excess = measuredWeight - threshold
     fine = excess * 10  // ₹10 per gram excess
   } else {
     fine = 0  // Within threshold, no fine
   }
   ```

3. **Update Firebase** (`/lastDetected/month`):
   ```json
   {
     "waste": currentWaste + measuredWeight,
     "finesPending": currentPending + fine,
     "weight": measuredWeight  // Store for reference
   }
   ```

4. **Update Student Record** (`/students/{studentId}`):
   - Update `monthlyData` array for current month
   - Recalculate aggregated totals (`waste`, `pendingFine`)

5. **Sync to MongoDB**:
   - Find user by `studentId`
   - Update `waste`, `pendingFine`, and `monthlyData`
   - Save to MongoDB

6. **Reset Weight**:
   - Set `/lastDetected/month/weight = 0` to prevent reprocessing

---

## Firebase Data Structure

### `/lastDetected` Node
```json
{
  "id": "123",
  "fullName": "Krishna",
  "picture": "/api/images/68f9cffab5558555e64de4d5",
  "detectedAt": "2025-11-06T13:24:00.244Z",
  "check": false,  // true = logged in, false = logged out
  "waste": 24,     // Total cumulative waste (grams)
  "totalFine": 22, // Total fines ever (₹)
  "pendingFine": 0,// Pending fines to be paid (₹)
  "score": 12,     // Sustainability score
  "weight": 44,    // Reference weight
  "month": {
    "year": 2025,
    "month": 11,
    "waste": 12,          // Waste for this month (grams)
    "weight": 5,          // Last measured weight (grams)
    "finesPending": 0,    // Pending fines for this month (₹)
    "finesCollected": 12, // Collected fines for this month (₹)
    "totalFines": 12,     // Total fines for this month (₹)
    "score": 12           // Score for this month
  }
}
```

### `/Threshold` Node
```json
{
  "value": 111,                    // Threshold in grams
  "updatedAt": 1761637106613       // Timestamp
}
```

### `/students/{studentId}` Node
```json
{
  "monthlyData": [
    {
      "year": 2025,
      "month": 11,
      "waste": 0,
      "finesPending": 0,
      "finesCollected": 0,
      "totalFines": 0,
      "score": 100
    }
  ],
  "waste": 0,       // Aggregated total
  "pendingFine": 0, // Aggregated total
  "score": 100      // Current score
}
```

---

## Setup Instructions

### 1. Arduino Configuration

**File**: `Sem5_Edai/Sem5_Edai.ino`

1. Update WiFi credentials:
   ```cpp
   #define WIFI_SSID "YourWiFiName"
   #define WIFI_PASSWORD "YourWiFiPassword"
   ```

2. Update Firebase credentials:
   ```cpp
   #define FIREBASE_EMAIL "your-email@example.com"
   #define FIREBASE_PASSWORD "your-password"
   #define FIREBASE_API_KEY "AIzaSyBNCtRP31RiEN9uPGOBPHdDrmN8YvnJKSY"
   ```

3. Calibrate load sensor:
   - Place known weight (e.g., 100g)
   - Adjust `calibration_factor` until reading is accurate
   ```cpp
   float calibration_factor = -7050;  // Adjust this value
   ```

4. Upload sketch to ESP8266

### 2. Backend Configuration

**File**: `edai2/Backend/.env`

Create from `.env.example` and configure:

```env
# MongoDB
MONGO_URI=mongodb://127.0.0.1:27017
MONGO_DB=smart-sentinel

# Server
PORT=5000

# Firebase Admin SDK
FIREBASE_DATABASE_URL=https://smart-dustbin-d4009-default-rtdb.firebaseio.com/
FIREBASE_PROJECT_ID=smart-dustbin-d4009
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@smart-dustbin-d4009.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

**Get Firebase Service Account:**
1. Go to Firebase Console → Project Settings
2. Service Accounts → Generate new private key
3. Download JSON file
4. Either:
   - Copy entire JSON to `FIREBASE_SERVICE_ACCOUNT` env variable, or
   - Extract `project_id`, `client_email`, `private_key` individually

### 3. Install Dependencies

**Backend:**
```bash
cd edai2/Backend
npm install firebase-admin
npm install
```

**React Face Auth:**
```bash
cd react-face-auth-master
npm install
```

**React Frontend:**
```bash
cd edai2/frontend
npm install
```

### 4. Start Services

**Terminal 1 - Backend:**
```bash
cd edai2/Backend
npm start
```

**Terminal 2 - React Face Auth:**
```bash
cd react-face-auth-master
npm run dev
```

**Terminal 3 - Frontend:**
```bash
cd edai2/frontend
npm run dev
```

---

## Testing the Workflow

### Test Scenario 1: Normal Usage (Within Threshold)

1. **Login**: Stand in front of camera, face detected
   - Verify: `check = true` in Firebase
   - Verify: Servo opens
   
2. **Dispose Waste**: Add 50g of waste
   - Arduino measures weight

3. **Logout**: Click logout button
   - Verify: `check = false` in Firebase
   - Verify: Servo closes
   - Verify: `weight = 50` uploaded to Firebase
   
4. **Fine Calculation** (Threshold = 111g):
   - 50g < 111g → No fine
   - Verify: `finesPending = 0`
   - Verify: `waste` increased by 50g

### Test Scenario 2: Exceeding Threshold

1. **Login**: Face detected
2. **Dispose Waste**: Add 150g of waste
3. **Logout**: Click logout
4. **Fine Calculation** (Threshold = 111g):
   - Excess = 150 - 111 = 39g
   - Fine = 39 * 10 = ₹390
   - Verify: `finesPending` increased by ₹390
   - Verify: `waste` increased by 150g

### Monitor Firebase Console

Watch these paths in real-time:
- `/lastDetected/check` (true/false)
- `/lastDetected/month/weight` (measured weight)
- `/lastDetected/month/waste` (cumulative)
- `/lastDetected/month/finesPending` (fines)

### Monitor Backend Logs

You should see:
```
✅ Firebase Admin initialized for waste processing
👂 Listening for waste measurements...
📊 Processing waste: 150g
🎯 Threshold: 111g, Measured: 150g
💰 Fine calculated: ₹390 (excess: 39g)
✅ Firebase updated - Waste: 162g, Pending Fine: ₹390
✅ Student 123 Firebase record updated
✅ MongoDB synced for student 123
🔄 Weight reset to 0 for next transaction
```

---

## Troubleshooting

### Arduino Issues

**Problem**: Load sensor not reading
- Check HX711 connections (DOUT → D2, SCK → D1)
- Verify power supply (5V, GND)
- Recalibrate using known weight

**Problem**: Servo not moving
- Check servo connection (Signal → D5, Power, GND)
- Verify Firebase `check` value is updating

**Problem**: WiFi not connecting
- Verify SSID and password
- Check WiFi signal strength
- Restart ESP8266

### Backend Issues

**Problem**: Firebase Admin initialization failed
- Verify service account credentials in `.env`
- Check `FIREBASE_DATABASE_URL` is correct
- Ensure private key has proper newline escaping (`\\n`)

**Problem**: Waste processor not triggering
- Check Firebase listener is running (see logs)
- Verify `/lastDetected/month/weight` is being updated by Arduino
- Check MongoDB connection

### Face Auth Issues

**Problem**: Face not detected
- Ensure good lighting
- Check camera permissions
- Verify face is properly registered in system

**Problem**: `check` not updating
- Check Firebase configuration in `src/config/firebase.js`
- Verify Firebase rules allow writes

---

## API Endpoints

### Logout Sync
```
POST http://localhost:5000/api/sync/logout
Content-Type: application/json

{
  "studentId": "123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Logout sync completed successfully",
  "data": {
    "success": true,
    "studentId": "123",
    "month": "2025-11"
  }
}
```

---

## Security Considerations

1. **Firebase Rules**: Configure proper read/write rules
2. **API Authentication**: Add JWT auth to logout endpoint in production
3. **Sensor Calibration**: Regularly calibrate load sensor for accuracy
4. **Data Validation**: Backend validates all inputs before processing
5. **Error Handling**: All failures are logged and don't crash the system

---

## Future Enhancements

1. **Multiple Bins**: Support multiple bins with unique IDs
2. **Waste Types**: Categorize waste (organic, recyclable, etc.)
3. **Real-time Notifications**: Alert students when approaching threshold
4. **Historical Analytics**: Detailed waste trends and reports
5. **Leaderboards**: Gamification for sustainable behavior
6. **Auto-Threshold Adjustment**: ML-based dynamic thresholds

---

## Contact & Support

For issues or questions:
- Arduino: Check serial monitor for debug logs
- Backend: Check server console for error messages
- Frontend: Check browser console for errors

Happy Sustainable Living! 🌱♻️
