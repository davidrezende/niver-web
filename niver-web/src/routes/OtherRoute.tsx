import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import GroupDashboard from '../pages/dashboard/GroupDashboard';
import ProfileDashboard from '../pages/dashboard/ProfileDashboard';

const OtherRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/groups" element={<GroupDashboard />} />
      <Route path="/profile" element={<ProfileDashboard />} />
      <Route path="*" element={<Navigate to="/groups" />} />
    </Routes>
  );
};

export default OtherRoutes;