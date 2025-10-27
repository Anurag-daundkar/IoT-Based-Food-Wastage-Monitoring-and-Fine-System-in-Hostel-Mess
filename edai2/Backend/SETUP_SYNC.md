# Firebase to MongoDB Sync Setup Guide

## Quick Setup

### 1. Environment Variables

Create or update your `.env` file in the Backend directory:

```env
# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/smart-sentinel
MONGO_DB=smart-sentinel

# Firebase Configuration
FIREBASE_SERVICE_ACCOUNT={"type":"service_account","project_id":"smart-dustbin-d4009",...}
FIREBASE_DATABASE_URL=https://smart-dustbin-d4009-default-rtdb.firebaseio.com

# Server Configuration
PORT=5000
JWT_SECRET=your-jwt-secret-key
```

### 2. Get Firebase Service Account Key

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `smart-dustbin-d4009`
3. Go to Project Settings → Service Accounts
4. Click "Generate new private key"
5. Download the JSON file
6. Copy the entire JSON content to your `FIREBASE_SERVICE_ACCOUNT` environment variable

### 3. Test the Setup

```bash
# Test the sync functionality
cd edai2/Backend
node scripts/testSync.js

# Test individual student sync
node scripts/manualSync.js student 12311587

# Test sync all students
node scripts/manualSync.js all
```

### 4. Start the Server

```bash
cd edai2/Backend
npm start
```

The server will automatically start the real-time sync listeners.

## Usage Examples

### Manual Sync via CLI

```bash
# Sync specific student
node scripts/manualSync.js student 12311587

# Sync all students
node scripts/manualSync.js all
```

### Manual Sync via API

```bash
# Get auth token first (login as admin)
TOKEN="your-jwt-token"

# Sync specific student
curl -X POST http://localhost:5000/api/sync/student/12311587 \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json"

# Sync all students
curl -X POST http://localhost:5000/api/sync/all \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json"
```

### Manual Sync via Admin Panel

1. Start the frontend: `cd edai2/frontend && npm run dev`
2. Login as admin
3. Navigate to "Data Sync" in the sidebar
4. Use the sync interface

## Workflow

1. **Update Firebase**: Manually update student data in Firebase console
2. **Trigger Sync**: Use any of the sync methods above
3. **Verify Changes**: Check MongoDB to confirm updates
4. **Monitor Logs**: Check console for sync status

## Troubleshooting

### Common Issues

1. **"Firebase not initialized"**
   - Check `FIREBASE_SERVICE_ACCOUNT` environment variable
   - Ensure JSON is properly formatted

2. **"No user found in MongoDB"**
   - Verify studentId exists in both Firebase and MongoDB
   - Check studentId format matches exactly

3. **"Firebase service account not configured"**
   - Set the `FIREBASE_SERVICE_ACCOUNT` environment variable
   - Restart the server

### Debug Mode

Enable detailed logging:
```bash
NODE_ENV=development npm start
```

## Data Flow

```
Firebase Console → Manual Update → Firebase Realtime DB → Sync Trigger → MongoDB Update
```

1. You manually update data in Firebase console
2. Firebase Realtime Database stores the changes
3. Sync system detects changes (real-time) or you trigger manual sync
4. System fetches data from Firebase
5. System updates corresponding MongoDB document
6. System recalculates totals and averages
7. Changes are logged for verification

## Security Notes

- Firebase service account has read-only access to your database
- All sync operations require admin authentication
- Changes are logged for audit purposes
- No sensitive data is exposed in logs

## Performance

- Individual sync: ~100-500ms
- Bulk sync: Depends on number of students
- Real-time sync: Near-instant
- Memory usage: Minimal

## Support

If you encounter issues:

1. Check the console logs for error messages
2. Verify all environment variables are set correctly
3. Test with individual students before bulk operations
4. Ensure Firebase and MongoDB connections are working
5. Check the detailed SYNC_README.md for more information
