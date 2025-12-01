import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaUser, FaCamera, FaIdCard, FaCheckCircle, FaUserCheck } from 'react-icons/fa';

const StudentRegistration = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <FaArrowLeft className="mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mt-4">Student Registration Process</h1>
          <p className="text-xl text-gray-600 mt-2">Step-by-step student onboarding guide</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <FaUser className="text-blue-600 w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Onboarding Students Made Easy</h2>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            This comprehensive guide walks you through the student registration process, from initial data collection to 
            final account activation. Whether you're onboarding individual students or conducting bulk registrations, 
            this guide ensures a smooth and efficient process.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-blue-800 font-medium">
              <strong>Pro Tip:</strong> For large batches of students, prepare a CSV file with student details in advance to streamline the bulk registration process.
            </p>
          </div>
        </div>

        {/* Registration Methods */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <FaUser className="text-blue-600 mr-3" />
              Individual Registration
            </h3>
            <p className="text-gray-600 mb-4">Ideal for registering single students or small groups manually through the admin interface.</p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Best for new admissions</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Immediate verification possible</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Real-time photo capture</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <FaUserCheck className="text-purple-600 mr-3" />
              Bulk Registration
            </h3>
            <p className="text-gray-600 mb-4">Efficient method for onboarding multiple students at once using CSV file upload.</p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                <span>Handles hundreds of students</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                <span>Automated credential generation</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                <span>Saves administrative time</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Individual Registration Steps */}
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Individual Registration</h2>
        <div className="space-y-6 mb-12">
          {/* Step 1 */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-6">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Access Registration Portal</h3>
                <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                  <div className="flex items-start">
                    <FaCheckCircle className="text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700">Log in to the Admin Dashboard</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaCheckCircle className="text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700">Navigate to "Student Management" → "Student Registration"</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaCheckCircle className="text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700">Click "Register New Student" button</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-6">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Enter Student Information</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700 mb-4 font-medium">Required Fields:</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded border-l-4 border-blue-500">
                      <p className="font-semibold text-gray-900">Full Name</p>
                      <p className="text-sm text-gray-600">Student's complete legal name</p>
                    </div>
                    <div className="bg-white p-4 rounded border-l-4 border-blue-500">
                      <p className="font-semibold text-gray-900">Student ID</p>
                      <p className="text-sm text-gray-600">Unique identifier (e.g., roll number)</p>
                    </div>
                    <div className="bg-white p-4 rounded border-l-4 border-blue-500">
                      <p className="font-semibold text-gray-900">Email Address</p>
                      <p className="text-sm text-gray-600">For login credentials & notifications</p>
                    </div>
                    <div className="bg-white p-4 rounded border-l-4 border-blue-500">
                      <p className="font-semibold text-gray-900">Phone Number</p>
                      <p className="text-sm text-gray-600">Contact number for alerts</p>
                    </div>
                    <div className="bg-white p-4 rounded border-l-4 border-blue-500">
                      <p className="font-semibold text-gray-900">Room Number</p>
                      <p className="text-sm text-gray-600">Hostel room assignment</p>
                    </div>
                    <div className="bg-white p-4 rounded border-l-4 border-blue-500">
                      <p className="font-semibold text-gray-900">Floor/Block</p>
                      <p className="text-sm text-gray-600">Hostel block or floor designation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-6">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Capture Face Recognition Photo</h3>
                <p className="text-gray-700 mb-4">This photo enables automatic student identification during waste disposal.</p>
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div className="flex items-center">
                    <FaCamera className="text-blue-600 text-3xl mr-4" />
                    <div>
                      <p className="font-semibold text-gray-900">Photo Guidelines:</p>
                      <ul className="text-gray-700 text-sm mt-2 space-y-1">
                        <li>• Well-lit environment with clear facial visibility</li>
                        <li>• Student should face the camera directly</li>
                        <li>• Remove glasses or accessories that obscure the face</li>
                        <li>• Neutral expression works best for recognition</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded">
                    <p className="text-blue-800 text-sm">
                      <strong>Note:</strong> The system will automatically process and store the facial features for recognition purposes. 
                      Students can update their photo later if needed through the admin portal.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-6">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Generate & Send Credentials</h3>
                <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                  <div className="flex items-start">
                    <FaCheckCircle className="text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700">System automatically generates secure login credentials</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaCheckCircle className="text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700">Welcome email sent to student's registered email address</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaCheckCircle className="text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700">SMS notification with login instructions (optional)</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaCheckCircle className="text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700">Student account activated immediately</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bulk Registration */}
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Bulk Registration</h2>
        <div className="space-y-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">CSV File Format</h3>
            <p className="text-gray-700 mb-4">Prepare a CSV file with the following columns in this exact order:</p>
            <div className="bg-gray-50 rounded-lg p-6 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-900 font-semibold">Column</th>
                    <th className="px-4 py-2 text-left text-gray-900 font-semibold">Description</th>
                    <th className="px-4 py-2 text-left text-gray-900 font-semibold">Example</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b">
                    <td className="px-4 py-2">student_id</td>
                    <td className="px-4 py-2">Unique student identifier</td>
                    <td className="px-4 py-2">ST20240001</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2">full_name</td>
                    <td className="px-4 py-2">Complete name</td>
                    <td className="px-4 py-2">John Doe</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2">email</td>
                    <td className="px-4 py-2">Valid email address</td>
                    <td className="px-4 py-2">john.doe@university.edu</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2">phone</td>
                    <td className="px-4 py-2">Contact number</td>
                    <td className="px-4 py-2">+91-9876543210</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2">room_number</td>
                    <td className="px-4 py-2">Room assignment</td>
                    <td className="px-4 py-2">A-101</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">floor_block</td>
                    <td className="px-4 py-2">Block/floor designation</td>
                    <td className="px-4 py-2">Block A, Floor 1</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
              <p className="text-yellow-800 text-sm">
                <strong>Important:</strong> Photos for face recognition must be collected separately for bulk-registered students. 
                Use the "Update Student Photo" feature in Student Management after bulk registration.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Upload & Process</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">1</div>
                <p className="text-gray-700 pt-1">Navigate to "Student Management" → "Bulk Registration"</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">2</div>
                <p className="text-gray-700 pt-1">Click "Upload CSV File" and select your prepared file</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">3</div>
                <p className="text-gray-700 pt-1">Review the preview to verify data accuracy</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">4</div>
                <p className="text-gray-700 pt-1">Click "Process Registrations" to create all accounts</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">5</div>
                <p className="text-gray-700 pt-1">System sends automated welcome emails to all students</p>
              </div>
            </div>
          </div>
        </div>

        {/* Post-Registration */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">✅ Post-Registration Checklist</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">For Administrators:</h3>
              <ul className="space-y-2 text-sm">
                <li>□ Verify all student accounts are activated</li>
                <li>□ Confirm face recognition photos are captured</li>
                <li>□ Test student login credentials</li>
                <li>□ Review room assignments for accuracy</li>
                <li>□ Set up initial waste weight thresholds</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">For Students:</h3>
              <ul className="space-y-2 text-sm">
                <li>□ Check email for login credentials</li>
                <li>□ Complete first-time login and password change</li>
                <li>□ Verify personal information in profile</li>
                <li>□ Familiarize with waste disposal process</li>
                <li>□ Review hostel waste management guidelines</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentRegistration;
