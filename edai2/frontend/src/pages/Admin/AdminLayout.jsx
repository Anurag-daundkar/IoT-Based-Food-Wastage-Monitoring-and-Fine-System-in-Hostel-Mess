import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'

const AdminLayout = () => {
  return (
    <div>
      <AdminSidebar/>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}

export default AdminLayout


