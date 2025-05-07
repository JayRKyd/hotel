import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminLayout from './AdminLayout';

const AdminLayoutRoute = () => {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};

export default AdminLayoutRoute;