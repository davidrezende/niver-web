import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import GroupDashboard from '../pages/dashboard/GroupDashboard';
import ProfileDashboard from '../pages/dashboard/ProfileDashboard';
import Register from '../pages/register/Register';
import Signin from '../pages/signin/Signin';

export const AppRoutes = () => {
  const isAuthenticated = localStorage.getItem("token") !== null;
  const PrivateWrapper = () => {
    console.log('valor:', isAuthenticated)
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  };
  return (
    <Routes>
      <Route element={<PrivateWrapper />}>
        <Route path="/groups" element={<GroupDashboard />} />
        <Route path="/profile" element={<ProfileDashboard />} />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Signin />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}