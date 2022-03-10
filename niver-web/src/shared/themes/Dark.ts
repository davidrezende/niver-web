import { createTheme } from '@mui/material';
import { blue, cyan } from '@mui/material/colors';

export const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: blue[700],
      dark: blue[800],
      light: blue[500],
      contrastText: '#ffffff',
    },
    secondary: {
      main: cyan[500],
      dark: cyan[400],
      light: cyan[300],
      contrastText: '#ffffff',
    },
    background: {
      paper: '#303134',
      // default: '#202124',
      default: 'rgb(1 63 122)',
    },
  },
  typography: {
    allVariants: {
      color: 'white',
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(1 63 112)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper:{
          backgroundColor: 'rgb(1 61 111)',
        },
        root: {
          backgroundColor: '#202124',
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(1 61 111)',
        },
      },
    },
  }
});