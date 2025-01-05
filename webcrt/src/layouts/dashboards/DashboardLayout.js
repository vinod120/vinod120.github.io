import React from 'react';
import { Outlet } from 'react-router-dom';
import AppLayout from '../app/AppLayout';

const DashboardLayout = () => {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};

export default DashboardLayout;
