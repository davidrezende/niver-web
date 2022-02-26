import { useContext, useEffect } from 'react';
// import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import AuthContext, { AuthProvider } from '../context/auth';
import GroupDashboard from '../pages/dashboard/GroupDashboard';
import ProfileDashboard from '../pages/dashboard/ProfileDashboard';
import Register from '../pages/register/Register';
import Signin from '../pages/signin/Signin';

// export const AppRoutes = () => {
//   const {signed} = useContext(AuthContext);


//   // const isAuthenticated = localStorage.getItem("token") !== null;
//   const PrivateWrapper = () => {
//     console.log('valor dentro das rotas:', signed)
//     return signed ? <Outlet /> : <Navigate to="/login" />;
//   };
//   return (
//     <Routes>
//       <Route element={<PrivateWrapper />}>
//         <Route path="/groups" element={<GroupDashboard />} />
//         <Route path="/profile" element={<ProfileDashboard />} />
//       </Route>
//       <Route path="/register" element={<Register />} />
//       <Route path="/login" element={<Signin />} />
//       <Route path="*" element={<Navigate to="/login" />} />
//     </Routes>
//   );
// }

import DefaultRoutes from './DefaultRoutes';
import AuthRoutes from './AuthRoutes';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Invite from '../pages/invite/Invite';
import React from 'react';

const RoutesCustom: React.FC = () => {
  const { signed, user } = useContext(AuthContext);
  const storagedUserId = localStorage.getItem('@App:userId');
  console.log('defininndo rota - estoulogado? ', signed)

  // return (
  //   !!signed ?
  //     <AuthRoutes />
  //     :
  //     <DefaultRoutes />
  // )

  return (
    <Routes>
      <Route path="/" element={<p>tela inicial</p>} />
      <Route path="/invite/:inviteId" element={<Invite />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Signin />} />

      <Route path="/profile" element={<ProfileDashboard />} />
      <Route path="/groups" element={<GroupDashboard />} />

      <Route path="*" element={<p>not found</p>} />
    </Routes>
  )

};

export default RoutesCustom;