import React from 'react'
import { Outlet } from 'react-router-dom'
import StudentSidebar from './StudentSidebar'

const StudentLayout = () => {
  return (
    <div>
      <StudentSidebar/>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}

export default StudentLayout


