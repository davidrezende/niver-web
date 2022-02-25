import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Invite from '../pages/invite/Invite';
import Register from '../pages/register/Register';

import Signin from '../pages/signin/Signin';

const DefaultRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Signin />}>
        <Route index element={<Signin />} />
        <Route path="login" element={<Signin />} />
      </Route>
      {/* //Protegendo rotas que necessitam de autenticacao */}
      <Route path="/register" element={<Register />} />
      <Route path="/invite/:inviteId" element={<Invite />} />
      <Route path="/groups" element={<Navigate to="/login" />} />
      <Route path="/profile" element={<Navigate to="/login" />} />
      <Route path="*" element={<p>not found</p>} />
    </Routes>
  );
};

export default DefaultRoutes;