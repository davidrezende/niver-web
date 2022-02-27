import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box, { BoxProps } from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Divider } from '@mui/material';
import ResponsiveAppBar from '../../components/appbar';
import { AppBarDashboard } from '../../components/AppBarDashboard';
import { Copyright } from '../../components';
import { useNavigate } from 'react-router-dom';


const theme = createTheme();

export default function Home() {

  let navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{
        backgroundColor: 'rgb(0 0 0 / 100%)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        < ResponsiveAppBar />
        <Grid container component="main" sx={{
          height: '100vh',
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
          <CssBaseline />
          <Grid item xs={12} sm={8} md={3} component={Paper} elevation={6} square direction="column" justifyContent="center"
            sx={{
              backgroundColor: 'rgb(0 0 0 / 33%)',
              alignItems: 'center',
              display: 'flex',
              flexWrap: 'wrap'
            }}>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box sx={{ mt: 1 }}>
                <Box sx={{ mb: 5, flexWrap: 'wrap' }} >
                  <img width="90%" src={require('./../../shared/images/logo_niver.png')} />
                </Box>
                <Copyright />
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={false}
            sm={4}
            sx={{
              alignContent: 'center',
              alignItems: 'center',
              flexGrow: 1,
              display: 'flex',
              flexWrap: 'wrap',

            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 1,
                m: 1,
                bgcolor: 'rgb(0 0 0 / 66%)',
                borderRadius: 1,
                flexWrap: 'wrap',
                flexGrow: 1,
                color: 'white'
              }}
            >
              <Grid item>
              </Grid >
              <Divider sx={{ ml: 2 }} orientation="vertical" variant='middle' flexItem />
              <Grid item xs>
                <Typography variant="h3" component="div" sx={{ fontFamily: 'Roboto' }}>
                  <strong>Esqueceu o aniversário de alguém ?</strong>
                </Typography>
                <br />
                <Typography variant="h4" component="div" sx={{ fontFamily: 'Roboto' }}>
                  Não se preocupe, estamos aqui para garantir que isso não irá se repetir.
                </Typography>
                <Box sx={{
                  alignContent: 'center',
                  alignItems: 'center',
                  flexGrow: 1,
                  display: 'flex'
                }}>
                  <Button color="inherit" onClick={() => navigate('/register')}>Cadastre-se</Button>  <Typography>e convide seus amigos!</Typography>
                </Box>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}