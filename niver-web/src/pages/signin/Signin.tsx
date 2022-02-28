import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/auth';
import { Link, useNavigate } from "react-router-dom";
import { Copyright } from '../../components';
import { useSnackbar } from 'notistack';
import CSS from 'csstype';
import { CircularProgress } from '@mui/material';
import BG_1 from '../../shared/images/bg_1.jpg';
import BG_2 from '../../shared/images/bg_2.jpg';
import BG_3 from '../../shared/images/bg_3.jpg';
import { DarkTheme } from '../../shared/themes/Dark';
const theme = DarkTheme;

export default function SignIn() {
  const [emailUser, setEmailUser] = useState('');
  const [passUser, setPassUser] = useState('');
  const [loading, setLoading] = useState(false);
  const { signed, user, Login, Logout } = useContext(AuthContext);
  const [banner, setBanner] = useState<{ url: number}>()

  const banners = 
  [
    { url: 1},
    { url: 2},
    { url: 3},
  ]
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  let navigate = useNavigate();


  useEffect(() => {
    setRandomBanner(banners.length)
    if (!!!user) {
      localStorage.clear()
      sessionStorage.removeItem('@App:userId');
      sessionStorage.removeItem('App:userName');
      sessionStorage.removeItem('App:token');
    } else {
      // navigate(-1)
      navigate('/groups')
    }
  }, [])

  function setRandomBanner(max: number) {
    return setBanner(banners[(Math.floor(Math.random() * max))]);
  }


  const handleSubmit = async () => {
    const regexpEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    if (regexpEmail.test(emailUser) && passUser.length >= 6) {
      setLoading(true)
      await delay(2000)
      Login({ "email": emailUser, "password": passUser })
      setLoading(false)
    } else {
      enqueueSnackbar('Usuário ou senha incorretos. 😢');
    }
  }

  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  return (
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <Grid container component="main" justifyContent="flex-end" sx={{
        height: '100vh',
        backgroundImage: `url(${banner?.url === 1 ? BG_1 : banner?.url === 2 ? BG_2 : BG_3})`,
        // backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor: (t) =>
          t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <Container component="main" maxWidth="xs" sx={{bgcolor: 'rgb(0 0 0 / 80%)',}}>
          
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
            <Box sx={{ mb: 5 }} alignContent='center' >
              <img width="90%" src={require('./../../shared/images/logo_niver.png')} />
            </Box>

            <Box sx={{ mt: 10 }}>
              <Typography component="h2" variant="h5" align='center'>
                😱 Quem eh <strong>você?!</strong> 🕵️‍♀️
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                value={emailUser}
                autoComplete="email"
                onChange={(e) => setEmailUser(e.target.value?.toLowerCase())}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                value={passUser}
                id="password"
                onChange={(e) => setPassUser(e.target.value)}
                autoComplete="current-password"
              />
              {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}

              {
                loading ?

                  <Box sx={{ m: 5, display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                  </Box>

                  :

                  <Button
                    type="button"
                    onClick={() => handleSubmit()}
                    fullWidth
                    disabled={!(emailUser && passUser)}
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    ENTRAR
                  </Button>

              }


              <Grid container>
                <Grid item xs>
                  <Link to="#">
                    Esqueceu a senha?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/register">
                    Quero criar minha conta
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </Grid>
    </ThemeProvider>
  );
}
