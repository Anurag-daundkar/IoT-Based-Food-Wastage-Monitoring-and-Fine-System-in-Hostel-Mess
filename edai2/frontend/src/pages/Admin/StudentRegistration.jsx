import React, { useState } from 'react';
import axios from 'axios';
import { FaCamera, FaUserPlus } from "react-icons/fa";

const StudentRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studentId: '',
    college: '',
    roomNumber: '',
    password: '',
    role: 'student',
    photo: null
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('password', formData.password);
      data.append('role', formData.role);
      data.append('studentId', formData.studentId);
      data.append('college', formData.college);
      data.append('roomNumber', formData.roomNumber);
      if (formData.photo) data.append('photo', formData.photo);

      // Call your backend signup API
      const res = await axios.post('/api/auth/signup', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage(res.data.message);
      setFormData({
        name: '',
        email: '',
        studentId: '',
        college: '',
        roomNumber: '',
        password: '',
        role: 'student',
        photo: null
      });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error registering student');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 ml-64">
      <header className="bg-white shadow-sm border-b border-gray-50 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Smart Sentinel Admin Panel</h1>
      </header>

      <main className="p-6 flex justify-center">
        <div className="w-full">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <FaUserPlus className="text-green-600 text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Student Registration</h2>
                <p className="text-gray-600">Add new students to the waste monitoring system</p>
              </div>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    required name="name" placeholder="Full Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:border-green-400 transition-colors"
                    value={formData.name} onChange={handleChange}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    required name="email" placeholder="Email" type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:border-green-400 transition-colors"
                    value={formData.email} onChange={handleChange}
                  />
                </div>

                {/* Student ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student ID *</label>
                  <input
                    required name="studentId" placeholder="Student ID"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:border-green-400 transition-colors"
                    value={formData.studentId} onChange={handleChange}
                  />
                </div>

                {/* College */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">College *</label>
                  <select
                    required name="college"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:border-green-400 transition-colors"
                    value={formData.college} onChange={handleChange}
                  >
                    <option value="">Select College</option>
                    <option value="Collge of Engineering Pune">Collge of Engineering Pune</option>
                    <option value="IIIT Pune">IIIT Pune</option>
                    <option value="Pune Institute of Computer Technology">Pune Institute of Computer Technology</option>
                    <option value="Vishwakarma Institute of Technology">Vishwakarma Institute of Technology</option>
                    <option value="AISSMS College">AISSMS College</option>
                    <option value="PVG College">PVG College</option>
                    <option value="Army Institute of Technology">Army Institute of Technology</option>
                  </select>
                </div>

                {/* Room Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Room Number *</label>
                  <input
                    required name="roomNumber" placeholder="Room Number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:border-green-400 transition-colors"
                    value={formData.roomNumber} onChange={handleChange}
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                  <input
                    required name="password" placeholder="Password" type="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:border-green-400 transition-colors"
                    value={formData.password} onChange={handleChange}
                  />
                </div>
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Photo for Face Recognition *</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
                  <input
                    accept="image/*" required
                    id="photo-upload" type="file" name="photo"
                    className="hidden" onChange={handleChange}
                  />
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <FaCamera className='text-gray-400 text-2xl' />
                    </div>
                    <p className="text-gray-600 mb-1">Click to upload student photo</p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                  </label>
                </div>
              </div>

              {/* Submit */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600">* Required fields</div>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Registering...' : 'Register Student'}
                </button>
              </div>

              {message && <p className="mt-4 text-center text-blue-600">{message}</p>}
            </form>
          </div>

          {/* Guidelines */}
          <div className="m-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-start space-x-3">
              <i className="ri-information-line text-blue-600 text-xl mt-0.5"></i>
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Registration Guidelines</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Ensure the student photo is clear and well-lit for face recognition</li>
                  <li>• Student ID should be unique across the institution</li>
                  <li>• Password should be at least 8 characters long</li>
                  <li>• Room number should match hostel records</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default StudentRegistration;
