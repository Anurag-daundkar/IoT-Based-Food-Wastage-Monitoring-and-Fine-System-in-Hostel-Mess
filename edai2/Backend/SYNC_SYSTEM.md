# Smart Sentinel Sync System

## Overview
Clean, selective sync system that only works with the specific student who logs in/out.

## Flow

### 🔹 Login (Face Recognition Success)
1. **Trigger**: Face scan successful
2. **Action**: `POST /api/sync/login`
3. **Payload**: `{ "studentId": "123" }`
4. **Process**: MongoDB → Firebase sync
5. **Result**: Current month data synced to Firebase

### 🔹 Logout (Logout Button Clicked)
1. **Trigger**: Student clicks logout
2. **Action**: `POST /api/sync/logout`
3. **Payload**: `{ "studentId": "123" }`
4. **Process**: Firebase → MongoDB sync
5. **Result**: Updated data synced back to MongoDB

## Endpoints

### POST `/api/sync/login`
- **Purpose**: Sync current month data from MongoDB to Firebase
- **Payload**: `{ "studentId": "123" }`
- **Response**: Success/error message

### POST `/api/sync/logout`
- **Purpose**: Sync current month data from Firebase to MongoDB
- **Payload**: `{ "studentId": "123" }`
- **Response**: Success/error message

## Success Logs

✅ **Login**: `"✅ MongoDB → Firebase sync done for student: {id} month: YYYY-MM"`
✅ **Logout**: `"✅ Firebase → MongoDB sync done for student: {id} month: YYYY-MM"`

## Edge Cases

| Case | Behavior |
|------|----------|
| Student exists in MongoDB but not Firebase | Create Firebase entry with MongoDB data |
| Student exists in Firebase but not MongoDB | ❌ Reject — MongoDB is source of truth |
| No current month data | Create new month entry with defaults |

## Files

- `utils/syncLogin.js` - MongoDB → Firebase sync
- `utils/syncLogout.js` - Firebase → MongoDB sync
- `controllers/syncController.js` - Request handlers
- `routes/syncRoutes.js` - API endpoints

## Removed

❌ Real-time database listeners
❌ Syncing all students
❌ Background sync jobs
❌ Continuous monitoring
❌ Global Firebase listeners

## Result

✅ **Simple, clean, selective syncing**
✅ **Only the student who logs in/out gets synced**
✅ **Current month data only**
✅ **Two sync operations: Login and Logout**
