import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';
import { FaPhone ,FaEnvelope ,FaShieldAlt, FaPlayCircle, FaRecycle, FaUsers, FaChartLine, FaLeaf, FaClock, FaBell, FaHotel, FaBuilding, FaHome, FaBalanceScale, FaPlus, FaTimes, FaUser, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaUserGraduate, FaUserShield } from "react-icons/fa";



const AdminSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return (
    <div>
      <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 z-50">
        <div className="p-6 border-b border-gray-200">
          <Link className="flex items-center space-x-2" to="/">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <FaRecycle className="text-white w-5 h-5 m-1" />
            </div>
            <span className="text-xl font-bold font-['Pacifico'] text-green-600">Smart Sentinel</span>
          </Link>
        </div>

        <nav className="mt-6">
          <NavLink
            to="/Admin/Dashboard"
            className={({ isActive }) =>
              `w-full flex items-center space-x-3 px-6 py-3 text-left transition-colors ${isActive ? 'bg-green-50 text-green-600 border-r-2 border-green-600' : 'text-gray-700 hover:text-green-600 hover:bg-green-50'}`
            }
          >
            <i className="ri-dashboard-line text-lg"></i>
            <span className="font-medium">Dashboard</span>
          </NavLink>

          <NavLink
            to="/Admin/StudentRegistration"
            className={({ isActive }) =>
              `w-full flex items-center space-x-3 px-6 py-3 text-left transition-colors ${isActive ? 'bg-green-50 text-green-600 border-r-2 border-green-600' : 'text-gray-700 hover:text-green-600 hover:bg-green-50'}`
            }
          >
            <i className="ri-user-add-line text-lg"></i>
            <span className="font-medium">Student Registration</span>
          </NavLink>

          <NavLink
            to="/Admin/StudentManagement"
            className={({ isActive }) =>
              `w-full flex items-center space-x-3 px-6 py-3 text-left transition-colors ${isActive ? 'bg-green-50 text-green-600 border-r-2 border-green-600' : 'text-gray-700 hover:text-green-600 hover:bg-green-50'}`
            }
          >
            <i className="ri-group-line text-lg"></i>
            <span className="font-medium">Student Management</span>
          </NavLink>

          <NavLink
            to="/Admin/StudentDoubts"
            className={({ isActive }) =>
              `w-full flex items-center space-x-3 px-6 py-3 text-left transition-colors ${isActive ? 'bg-green-50 text-green-600 border-r-2 border-green-600' : 'text-gray-700 hover:text-green-600 hover:bg-green-50'}`
            }
          >
            <i className="ri-question-answer-line text-lg"></i>
            <span className="font-medium">Complaints/Doubts</span>
          </NavLink>

          {/* DataSync removed */}
        </nav>

        <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2">
          <Link className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors" to="/">
            <i className="ri-arrow-left-line"></i>
            <span>Back to Home</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors w-full mt-2"
          >
            <i className="ri-logout-box-r-line"></i>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </div>
  )
}

export default AdminSidebar
