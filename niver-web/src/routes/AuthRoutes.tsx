import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import GroupDashboard from '../pages/dashboard/GroupDashboard';
import ProfileDashboard from '../pages/dashboard/ProfileDashboard';

const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      {/* <Route path="/groups" element={<GroupDashboard />}>
        <Route index element={<GroupDashboard />} />
        <Route path="groups" element={<GroupDashboard />} />
      </Route> */}
      <Route path="*" element={<Navigate to="groups" replace />} />
      <Route path="profile" element={<ProfileDashboard />} />
      <Route path="groups" element={<GroupDashboard />} />
    </Routes>
  );
};

export default AuthRoutes;