import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Register from '../pages/register/Register';

import Signin from '../pages/signin/Signin';

const SignRoutes: React.FC = () => {
  return (
      <Routes>
        <Route path="/login" element={<Signin />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
  );
};

export default SignRoutes;