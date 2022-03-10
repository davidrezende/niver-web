import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import GroupDashboard from '../pages/dashboard/GroupDashboard';
import ProfileDashboard from '../pages/dashboard/ProfileDashboard';
import Home from '../pages/home/Home';
import Invite from '../pages/invite/Invite';
import Register from '../pages/register/Register';
import Signin from '../pages/signin/Signin';


const RoutesCustom: React.FC = () => {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/groups/invite/:inviteId" element={<Invite />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Signin />} />

      <Route path="/profile" element={<ProfileDashboard />} />
      <Route path="/groups" element={<GroupDashboard />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )

};

export default RoutesCustom;