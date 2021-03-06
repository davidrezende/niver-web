import { SnackbarProvider } from "notistack";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth";
// import { AppRoutes } from './routes';
import RoutesCustom from './routes';

export const App = () => {
  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}>
      <AuthProvider>
          <RoutesCustom />
      </AuthProvider>
    </SnackbarProvider>
  );
}