import { useContext } from 'react';
// import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/auth';
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

import SignRoute from './SigninRoute';
import OtherRoute from './OtherRoute';

const Routes: React.FC = () => {
  const { signed } = useContext(AuthContext);
 
  return signed ? <OtherRoute /> : <SignRoute />;
 };
 
export default Routes;