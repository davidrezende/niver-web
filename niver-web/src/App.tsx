import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth";
// import { AppRoutes } from './routes';
import Routes from './routes';

export const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AuthProvider>
  );
}