import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';

const StudentSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 z-50">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <i className="ri-leaf-line text-white"></i>
          </div>
          <span className="text-xl font-bold text-green-600">Smart Sentinel</span>
        </div>
      </div>

  <nav className="mt-6">
        <NavLink to="/Student/Profile" className={({ isActive }) => `w-full flex items-center space-x-3 px-6 py-3 text-left transition-colors ${isActive ? 'bg-green-50 text-green-600 border-r-2 border-green-600' : 'text-gray-700 hover:text-green-600 hover:bg-green-50'}`}>
          <i className="ri-user-line text-lg"></i>
          <span className="font-medium">My Profile</span>
        </NavLink>
        <NavLink to="/Student/Waste" className={({ isActive }) => `w-full flex items-center space-x-3 px-6 py-3 text-left transition-colors ${isActive ? 'bg-green-50 text-green-600 border-r-2 border-green-600' : 'text-gray-700 hover:text-green-600 hover:bg-green-50'}`}>
          <i className="ri-recycle-line text-lg"></i>
          <span className="font-medium">Waste & Fines</span>
        </NavLink>
        <NavLink to="/Student/Feedback" className={({ isActive }) => `w-full flex items-center space-x-3 px-6 py-3 text-left transition-colors ${isActive ? 'bg-green-50 text-green-600 border-r-2 border-green-600' : 'text-gray-700 hover:text-green-600 hover:bg-green-50'}`}>
          <i className="ri-feedback-line text-lg"></i>
          <span className="font-medium">Feedback</span>
        </NavLink>
      </nav>
      <div className="absolute bottom-6 left-6 right-6">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors w-full"
        >
          <i className="ri-logout-box-r-line"></i>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default StudentSidebar


