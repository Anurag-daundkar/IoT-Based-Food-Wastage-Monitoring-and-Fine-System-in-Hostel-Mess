import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaCheckCircle, FaPlayCircle, FaCog, FaUsers, FaChartLine } from 'react-icons/fa';

const GettingStarted = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link to="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-4">
            <FaArrowLeft className="mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mt-4">Getting Started with Smart Sentinel</h1>
          <p className="text-xl text-gray-600 mt-2">5-minute setup guide for administrators</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <FaPlayCircle className="text-green-600 w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Welcome to Smart Sentinel!</h2>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Smart Sentinel is your comprehensive waste management solution designed specifically for student hostels. 
            This guide will walk you through the initial setup process and help you get your system up and running in just 5 minutes.
          </p>
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="text-green-800 font-medium">
              <strong>Quick Tip:</strong> Make sure you have your institution details, admin credentials, and IoT sensor information ready before starting.
            </p>
          </div>
        </div>

        {/* Setup Steps */}
        <div className="space-y-6">
          {/* Step 1 */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-6">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Initial System Configuration</h3>
                <p className="text-gray-700 mb-4">
                  Begin by configuring your Smart Sentinel system with your institution's basic information.
                </p>
                <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                  <div className="flex items-start">
                    <FaCheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-gray-900">Access Admin Portal:</strong>
                      <p className="text-gray-600">Navigate to the admin login page and use your provided credentials</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaCheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-gray-900">Configure Institution Details:</strong>
                      <p className="text-gray-600">Enter your institution name, hostel details, and contact information</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaCheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-gray-900">Set Up Admin Account:</strong>
                      <p className="text-gray-600">Create additional admin accounts if needed for your team</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-6">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">IoT Sensor Setup</h3>
                <p className="text-gray-700 mb-4">
                  Connect your IoT sensors to monitor waste levels in real-time across your hostel premises.
                </p>
                <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                  <div className="flex items-start">
                    <FaCheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-gray-900">Register Sensors:</strong>
                      <p className="text-gray-600">Add sensor IDs and assign them to specific hostel areas (rooms, floors, common areas)</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaCheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-gray-900">Calibrate Weight Thresholds:</strong>
                      <p className="text-gray-600">Set optimal waste weight limits for each area based on occupancy and usage patterns</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaCheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-gray-900">Test Connectivity:</strong>
                      <p className="text-gray-600">Verify that all sensors are communicating properly with the central system</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-6">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Configure Fine System</h3>
                <p className="text-gray-700 mb-4">
                  Set up the weight-based fine system to encourage responsible waste management behavior.
                </p>
                <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                  <div className="flex items-start">
                    <FaCheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-gray-900">Define Fine Structure:</strong>
                      <p className="text-gray-600">Configure the per-gram fine rate (default: ₹10.00 per gram for excess waste above 2g threshold)</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaCheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-gray-900">Set Notification Preferences:</strong>
                      <p className="text-gray-600">Configure automated alerts for students when fines are incurred</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaCheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-gray-900">Payment Integration:</strong>
                      <p className="text-gray-600">Set up payment gateway for students to clear pending fines</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-6">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Student Onboarding</h3>
                <p className="text-gray-700 mb-4">
                  Register students in the system to start tracking waste management and accountability.
                </p>
                <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                  <div className="flex items-start">
                    <FaCheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-gray-900">Bulk Registration:</strong>
                      <p className="text-gray-600">Upload student data via CSV import or register individually through the admin portal</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaCheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-gray-900">Face Recognition Setup:</strong>
                      <p className="text-gray-600">Capture student photos for face recognition-based waste disposal tracking</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaCheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-gray-900">Send Login Credentials:</strong>
                      <p className="text-gray-600">Students receive login credentials to access their personal dashboard</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-6">
                5
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Launch & Monitor</h3>
                <p className="text-gray-700 mb-4">
                  You're all set! Start monitoring waste management activities and track sustainability metrics.
                </p>
                <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                  <div className="flex items-start">
                    <FaCheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-gray-900">Dashboard Overview:</strong>
                      <p className="text-gray-600">Access real-time analytics showing waste levels, fines collected, and student participation</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaCheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-gray-900">Review Alerts:</strong>
                      <p className="text-gray-600">Monitor system notifications for overflowing bins and maintenance needs</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaCheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-gray-900">Engage Students:</strong>
                      <p className="text-gray-600">Launch awareness campaigns and view leaderboards to encourage sustainable behavior</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-lg p-8 mt-8 text-white">
          <h2 className="text-2xl font-bold mb-4">🎉 Congratulations! You're All Set!</h2>
          <p className="text-lg mb-6">
            Your Smart Sentinel system is now ready to transform waste management in your hostel. 
            Here are some recommended next steps to maximize the impact of your new system:
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <Link to="/resources/analytics-dashboard" className="bg-white bg-opacity-20 rounded-lg p-6 hover:bg-opacity-30 transition">
              <FaChartLine className="w-8 h-8 mb-3" />
              <h3 className="font-semibold mb-2">Explore Analytics</h3>
              <p className="text-sm">Learn how to interpret and use your dashboard data effectively</p>
            </Link>
            <Link to="/resources/student-engagement" className="bg-white bg-opacity-20 rounded-lg p-6 hover:bg-opacity-30 transition">
              <FaUsers className="w-8 h-8 mb-3" />
              <h3 className="font-semibold mb-2">Engagement Strategies</h3>
              <p className="text-sm">Discover best practices to motivate student participation</p>
            </Link>
            <Link to="/resources/waste-segregation" className="bg-white bg-opacity-20 rounded-lg p-6 hover:bg-opacity-30 transition">
              <FaCog className="w-8 h-8 mb-3" />
              <h3 className="font-semibold mb-2">Waste Guidelines</h3>
              <p className="text-sm">Review proper waste segregation techniques</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GettingStarted;
