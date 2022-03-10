import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Copyright } from '../../components';
import AuthContext from '../../context/auth';
import BG_1 from '../../shared/images/bg_1.jpg';
import BG_2 from '../../shared/images/bg_2.jpg';
import BG_3 from '../../shared/images/bg_3.jpg';
import { DefaultTheme } from '../../shared/themes/Default';


export default function SignIn() {
  const [emailUser, setEmailUser] = useState('');
  const [passUser, setPassUser] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, Login } = useContext(AuthContext);
  const [banner, setBanner] = useState<{ url: number}>()

  const banners = 
  [
    { url: 1},
    { url: 2},
    { url: 3},
  ]
  const { enqueueSnackbar } = useSnackbar();
  let navigate = useNavigate();


  useEffect(() => {
    sessionStorage.removeItem('themeDefault');
    console.log('tema preferido pela pessoa:', localStorage.getItem('themeDefault'))
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

  const themePrefer = React.useMemo(
    () =>
      DefaultTheme('dark'),
    [],
  );

  return (
    <ThemeProvider theme={themePrefer} >
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
        backgroundAttachment: 'fixed',
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
            <Box sx={{ mb: 5 }} alignContent='center' >
              <img alt="NiverDeQuem Logo" width="90%" src={require('./../../shared/images/logo_niver.png')} />
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
                  {/* <Link to="#">
                    Esqueceu a senha?
                  </Link> */}
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
