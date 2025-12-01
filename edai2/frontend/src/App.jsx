import { AuthProvider } from './context/AuthContext';
import './App.css'

// Landing Page
import LandingPage from './pages/LandingPage'

// Resource Pages
import GettingStarted from './pages/Resources/GettingStarted'
import StudentRegistrationGuide from './pages/Resources/StudentRegistration'
import AnalyticsDashboard from './pages/Resources/AnalyticsDashboard'
import WasteSegregation from './pages/Resources/WasteSegregation'
import StudentEngagement from './pages/Resources/StudentEngagement'
import FineSystemImplementation from './pages/Resources/FineSystemImplementation'

// Admin
import AdminLayout from './pages/Admin/AdminLayout'
import Dashboard from './pages/Admin/Dashboard'
import StudentRegistration from './pages/Admin/StudentRegistration'
import StudentManagement from './pages/Admin/StudentManagement'
import ComplaintsDoubts from './pages/Admin/ComplaintsDoubts'
import StudentProfile from './pages/Admin/StudentProfile'
import ThresholdPage from './pages/Admin/Threshold'

// Login pages
import AdminLoginPage from './pages/AdminLoginPage'
import StudentLoginPage from './pages/StudentLoginPage'

// Student
import StudentLayout from './pages/Student/StudentLayout'
import Profile from './pages/Student/Profile'
import Waste from './pages/Student/Waste'
import Feedback from './pages/Student/Feedback'
import Payment from './pages/Student/Payment'

// Routing
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute';

// Error Page Not Found Page
import Error from './pages/PageNotfound/Error'

function App() {

  const routing = createBrowserRouter([
    { path: '/', element: <LandingPage/> },
    { path: '/AdminLogin', element: <AdminLoginPage/> },
    { path: '/StudentLogin', element: <StudentLoginPage/> },
    
    // Resource pages
    { path: '/resources/getting-started', element: <GettingStarted/> },
    { path: '/resources/student-registration', element: <StudentRegistrationGuide/> },
    { path: '/resources/analytics-dashboard', element: <AnalyticsDashboard/> },
    { path: '/resources/waste-segregation', element: <WasteSegregation/> },
    { path: '/resources/student-engagement', element: <StudentEngagement/> },
    { path: '/resources/fine-system', element: <FineSystemImplementation/> },
    {
      element: <ProtectedRoute allowedRoles={['admin']} />, // Protect all /Admin routes
      children: [
        {
          path: '/Admin',
          element: <AdminLayout/>,
          children: [
            { index: true, element: <Dashboard/> },
            { path: 'Dashboard', element: <Dashboard/> },
            { path: 'StudentRegistration', element: <StudentRegistration/> },
            { path: 'StudentManagement', element: <StudentManagement/> },
            { path: 'Student/:id', element: <StudentProfile/> },
            { path: 'StudentDoubts', element: <ComplaintsDoubts/> },
            { path: 'Threshold', element: <ThresholdPage/> },
          ],
        },
      ],
    },
    {
      element: <ProtectedRoute allowedRoles={['student']} />, // Protect all /Student routes
      children: [
        {
          path: '/Student',
          element: <StudentLayout/>,
          children: [
            { index: true, element: <Profile/> },
            { path: 'Profile', element: <Profile/> },
            { path: 'Waste', element: <Waste/>, children: [ { path: 'payment', element: <Payment/> } ] },
            // { path: 'Notification', element: <Notification/> },
            { path: 'Feedback', element: <Feedback/> },
          ],
        },
      ],
    },
    { path: '*', element: <Error/> },
  ])

  return (
    <AuthProvider>
      <RouterProvider router={routing} />
    </AuthProvider>
  )
}

export default App
