# Firebase to MongoDB Data Synchronization

This document explains how to use the enhanced Firebase to MongoDB synchronization system for the Smart Sentinel project.

## Overview

The sync system allows you to manually update student data in Firebase and then synchronize those changes to your MongoDB database. This is particularly useful when you need to update values like waste amounts, fines, and scores manually.

## Features

- **Real-time Sync**: Automatically syncs changes when Firebase data is updated
- **Manual Sync**: Trigger sync operations on demand
- **Individual Student Sync**: Sync specific students by ID
- **Bulk Sync**: Sync all students at once
- **Change Tracking**: Detailed logging of what changed during sync
- **Error Handling**: Comprehensive error reporting

## Setup

### 1. Environment Variables

Make sure you have the following environment variables set in your `.env` file:

```env
FIREBASE_SERVICE_ACCOUNT={"type":"service_account","project_id":"your-project",...}
FIREBASE_DATABASE_URL=https://your-project-default-rtdb.firebaseio.com
MONGO_URI=mongodb://localhost:27017/your-database
```

### 2. Firebase Service Account

You need to create a Firebase service account key:

1. Go to Firebase Console → Project Settings → Service Accounts
2. Generate a new private key
3. Copy the JSON content to your `FIREBASE_SERVICE_ACCOUNT` environment variable

## Usage

### 1. Real-time Sync (Automatic)

The system automatically listens for changes in Firebase and syncs them to MongoDB. This happens in the background when the server starts.

### 2. Manual Sync via API

#### Sync Individual Student

```bash
POST /api/sync/student/{studentId}
Authorization: Bearer {your-jwt-token}
```

Example:
```bash
curl -X POST http://localhost:5000/api/sync/student/12311587 \
  -H "Authorization: Bearer your-jwt-token" \
  -H "Content-Type: application/json"
```

#### Sync All Students

```bash
POST /api/sync/all
Authorization: Bearer {your-jwt-token}
```

Example:
```bash
curl -X POST http://localhost:5000/api/sync/all \
  -H "Authorization: Bearer your-jwt-token" \
  -H "Content-Type: application/json"
```

### 3. Manual Sync via CLI

#### Sync Individual Student

```bash
cd edai2/Backend
node scripts/manualSync.js student 12311587
```

#### Sync All Students

```bash
cd edai2/Backend
node scripts/manualSync.js all
```

### 4. Manual Sync via Admin Panel

1. Login as admin
2. Navigate to "Data Sync" in the sidebar
3. Enter student ID and click "Sync Student" or click "Sync All Students"

## Data Structure

### Firebase Structure
```
students/
  {studentId}/
    studentId: "12311587"
    monthlyData: [
      {
        year: 2025,
        month: 1,
        waste: 12.5,
        finesCollected: 300,
        finesPending: 0,
        totalFines: 300,
        score: 75
      }
    ]
```

### MongoDB Structure
```javascript
{
  _id: ObjectId("..."),
  name: "Student Name",
  email: "student@email.com",
  studentId: "12311587",
  waste: 78.5,           // Total waste (sum of monthlyData)
  totalFine: 2100,       // Total fines (sum of monthlyData)
  pendingFine: 0,        // Pending fines (sum of monthlyData)
  score: 72,             // Average score
  monthlyData: [...]     // Monthly breakdown
}
```

## Sync Process

1. **Fetch Data**: Retrieves student data from Firebase
2. **Find User**: Locates corresponding user in MongoDB by studentId
3. **Update Monthly Data**: Replaces monthlyData array with Firebase data
4. **Recalculate Totals**: Computes new totals for waste, fines, and score
5. **Save Changes**: Updates MongoDB with new data
6. **Log Results**: Records what changed for verification

## Error Handling

The sync system handles various error scenarios:

- **Firebase Connection Issues**: Logs connection errors
- **Missing Student Data**: Reports when student not found
- **MongoDB Errors**: Handles database connection and save errors
- **Data Validation**: Validates data before syncing

## Monitoring

### Console Logs

The system provides detailed console output:

```
🔄 Syncing student: 12311587
✅ Successfully synced Firebase data to MongoDB for student: 12311587
Changes: {
  "waste": { "from": 70.5, "to": 78.5 },
  "totalFine": { "from": 1800, "to": 2100 },
  "score": { "from": 70, "to": 72 }
}
```

### API Responses

```json
{
  "success": true,
  "message": "Student data synced successfully",
  "data": {
    "success": true,
    "studentId": "12311587",
    "changes": {
      "waste": { "from": 70.5, "to": 78.5 },
      "totalFine": { "from": 1800, "to": 2100 }
    }
  }
}
```

## Best Practices

1. **Backup Data**: Always backup your MongoDB before bulk sync operations
2. **Test Individual Sync**: Test with individual students before bulk sync
3. **Monitor Logs**: Check console logs for sync status
4. **Verify Changes**: Review the changes object to ensure correct updates
5. **Handle Errors**: Check for failed syncs and retry if needed

## Troubleshooting

### Common Issues

1. **Firebase Not Initialized**
   - Check FIREBASE_SERVICE_ACCOUNT environment variable
   - Verify JSON format is correct

2. **Student Not Found**
   - Ensure studentId exists in both Firebase and MongoDB
   - Check studentId format matches exactly

3. **Sync Fails**
   - Check MongoDB connection
   - Verify user permissions
   - Review error logs for specific issues

### Debug Mode

Enable detailed logging by setting:
```env
NODE_ENV=development
```

## Security

- All sync operations require authentication
- Only admin users can trigger manual syncs
- Firebase service account has limited permissions
- All operations are logged for audit purposes

## Performance

- Individual sync: ~100-500ms per student
- Bulk sync: Depends on number of students
- Real-time sync: Near-instant for Firebase changes
- Memory usage: Minimal overhead

## Support

For issues or questions:
1. Check console logs for error messages
2. Verify environment variables
3. Test with individual students first
4. Review this documentation
