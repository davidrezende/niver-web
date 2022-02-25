import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ResponsiveAppBar from '../../components/appbar';
import { Copyright } from '../../components';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { ptBR } from "date-fns/locale";
import { Link, useNavigate, useParams } from 'react-router-dom';
import CakeSharpIcon from '@mui/icons-material/CakeSharp';
import { AuthenticationService } from '../../services/AuthenticationService';
import { useState } from 'react';
import { useSnackbar } from 'notistack';

const theme = createTheme();

export default function Invite() {
  const [birthdayDate, setBirthdayDate] = useState<Date | null>(null);
  const [emailUser, setEmailUser] = useState('');
  const [userName, setUserName] = useState('');
  const [passUser, setPassUser] = useState('');
  const [passUserConfirm, setPassUserConfirm] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  let { inviteId }  = useParams();

  let navigate = useNavigate();

  const handleRegister = async () => {
    const regexpEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    const regexDatePicker = new RegExp(/^\d{2}\/\d{2}\/\d{4}$/);
    if (!(emailUser && userName && birthdayDate && passUser && passUserConfirm)) {
      return enqueueSnackbar('Precisamos de todos os dados preenchidos 😡')
    } else if (!regexpEmail.test(emailUser)) {
      return enqueueSnackbar('Email inválido 😕')
    } else if (!regexDatePicker.test(birthdayDate.toLocaleDateString())) {
      return enqueueSnackbar('Data de nascimento inválida 😕')
    } else if (passUser !== passUserConfirm) {
      setPassUser('')
      setPassUserConfirm('')
      return enqueueSnackbar('As senhas não coincidem 😕')
    } else if (!(passUser.length >= 6)) {
      return enqueueSnackbar('A senha precisa ter no mínimo 6 caracteres 😕')
    }

    await AuthenticationService.register(
      { "name": userName, "birthday": birthdayDate!, "email": emailUser, "password": passUser }
    ).then((response) => {
      console.log(response)
      enqueueSnackbar('🌟 Cadastro realizado com sucesso 🌟')
      navigate('/login')
    }).catch((error) => {
      console.log(error)
      enqueueSnackbar('Serviço indisponível 😨')
    })
  };



  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
      <ThemeProvider theme={theme}>
        {/* <ResponsiveAppBar /> */}
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <CakeSharpIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Quase lá! Param: {inviteId}
            </Typography>
            <Box component="form" noValidate onSubmit={handleRegister} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    id="name"
                    label="Seu nick/nome"
                    inputProps={{ maxLength: 25 }}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    disableFuture
                    label="Data de nascimento"
                    openTo="year"
                    views={['year', 'month', 'day']}
                    value={birthdayDate}
                    onChange={(newValue) => {
                      setBirthdayDate(newValue);
                    }}
                    renderInput={(params) => <TextField required {...params} />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Seu melhor email"
                    value={emailUser}
                    inputProps={{ maxLength: 50 }}
                    onChange={(e) => setEmailUser(e.target.value?.toLowerCase())}
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Senha"
                    value={passUser}
                    inputProps={{ maxLength: 50 }}
                    type="password"
                    onChange={(e) => setPassUser(e.target.value)}
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="passwordConfirm"
                    inputProps={{ maxLength: 50 }}
                    value={passUserConfirm}
                    onChange={(e) => setPassUserConfirm(e.target.value)}
                    label="Confirme sua senha"
                    error={passUser != passUserConfirm}
                    helperText={passUser != passUserConfirm ? 'Senhas divergentes' : ' '}
                    type="password"
                    id="passwordConfirm"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked readOnly value="allowEmails" color="primary" />}
                    label="Concordo ser mais feliz recebendo apenas emails essenciais dessa plataforma 😍"
                  />
                </Grid>
              </Grid>
              <Button
                type="button"
                disabled={!(emailUser && userName && birthdayDate && passUser && passUserConfirm)}
                fullWidth
                onClick={handleRegister}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                ESTOU PRONTO! VAMOS LÁ
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login">
                    Já tem cadastro?
                  </Link> 😚
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </LocalizationProvider>
  );
}
