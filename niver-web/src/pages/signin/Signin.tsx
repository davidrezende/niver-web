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

const theme = createTheme();

export default function SignIn() {
  const [emailUser, setEmailUser] = useState('');
  const [passUser, setPassUser] = useState('');
  const {signed, user, Login, Logout} = useContext(AuthContext);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  let navigate = useNavigate();

  useEffect(() => {
    localStorage.clear()
    sessionStorage.removeItem('@App:userId');
    sessionStorage.removeItem('App:userName');
    sessionStorage.removeItem('App:token');
  }, [])


  const handleSubmit = async () => {
    const regexpEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    if(regexpEmail.test(emailUser) && passUser.length >= 6){
      await Login({ "email": emailUser, "password": passUser })
    }else{
      enqueueSnackbar('Usuário ou senha incorretos. 😢');
    }
  }
 


  return (
    <ThemeProvider theme={theme} >
      <Container component="main" maxWidth="xs" > 
        <CssBaseline />
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
          <Typography component="h2" variant="h5">
          😱 Quem eh <strong>você?!</strong> 🕵️‍♀️
          </Typography>
          <Box sx={{ mt: 1 }}>
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
    </ThemeProvider>
  );
}