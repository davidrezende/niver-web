import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/dashboard/GroupDashboard';
import Register from '../pages/register/Register';
import Signin from '../pages/signin/Signin';

export const AppRoutes = () => {

  return ( 
    <Routes>
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Signin/>} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}