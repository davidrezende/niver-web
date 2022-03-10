import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import GroupDashboard from '../pages/dashboard/GroupDashboard';
import ProfileDashboard from '../pages/dashboard/ProfileDashboard';
import Invite from '../pages/invite/Invite';


const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      {/* <Route path="/groups" element={<GroupDashboard />}>
        <Route index element={<GroupDashboard />} />
        <Route path="groups" element={<GroupDashboard />} />
      </Route> */}
      {/* <Route path="*" element={<Outlet/>} /> */}
      <Route path="profile" element={<ProfileDashboard />} />
      <Route path="groups" element={<GroupDashboard />} />
      <Route path="invite/:inviteId" element={<Invite/>} />
      <Route path="register" element={<Navigate to="/groups"/>} />
    </Routes>
  );
};

export default AuthRoutes;