import CakeSharpIcon from '@mui/icons-material/CakeSharp';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import { ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { format, isValid } from 'date-fns';
import { ptBR } from "date-fns/locale";
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Copyright } from '../../components';
import AuthContext from '../../context/auth';
import { AuthenticationService } from '../../services/AuthenticationService';
import BG_1 from '../../shared/images/bg_1.jpg';
import BG_2 from '../../shared/images/bg_2.jpg';
import BG_3 from '../../shared/images/bg_3.jpg';
import { DefaultTheme } from '../../shared/themes/Default';

export default function SignUp() {
  const [birthdayDate, setBirthdayDate] = useState<Date | null>(null);
  const [emailUser, setEmailUser] = useState('');
  const [userName, setUserName] = useState('');
  const [passUser, setPassUser] = useState('');
  const [passUserConfirm, setPassUserConfirm] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  let navigate = useNavigate();
  const [banner, setBanner] = useState<{ url: number }>();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false)

  const banners =
    [
      { url: 1 },
      { url: 2 },
      { url: 3 },
    ]

  function setRandomBanner(max: number) {
    return setBanner(banners[(Math.floor(Math.random() * max))]);
  }


  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const handleRegister = async () => {
    const regexpEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    const regexDatePicker = new RegExp(/^\d{2}\/\d{2}\/\d{4}$/);
    if (!(emailUser && userName && birthdayDate && passUser && passUserConfirm)) {
      return enqueueSnackbar('Precisamos de todos os dados preenchidos 😡')
    }
    if (!regexpEmail.test(emailUser)) {
      return enqueueSnackbar('Email inválido 😕')
    }

    var dateFormat = format(birthdayDate!, 'dd/MM/yyyy')
    // var parsedDate = parseISO(dateFormat!)
    console.log('birthdayDate:', birthdayDate, '\ndateFormat:', dateFormat)
    // if (!regexDatePicker.test(birthdayDate.toLocaleDateString())) {
    if (!regexDatePicker.test(dateFormat) && !isValid(birthdayDate)) {
      return enqueueSnackbar('Data de nascimento inválida 😕')
    }
    if (passUser !== passUserConfirm) {
      setPassUser('')
      setPassUserConfirm('')
      return enqueueSnackbar('As senhas não coincidem 😕')
    }
    if (!(passUser.length >= 6)) {
      return enqueueSnackbar('A senha precisa ter no mínimo 6 caracteres 😕')
    }
    if (userName.trim().length <= 0 || userName.trim().length > 25) {
      return enqueueSnackbar('Nome inválido 😕')
    }
    setLoading(true)
    await delay(2000)
    await AuthenticationService.register(
      { "name": userName, "birthday": birthdayDate!, "email": emailUser, "password": passUser }
    ).then((response) => {
      setLoading(false)
      enqueueSnackbar('🌟 Cadastro realizado com sucesso 🌟')
      navigate('/login')
    }).catch((error) => {
      console.log(error)
      setLoading(false)
      enqueueSnackbar('Serviço indisponível 😨')
    })
  };

  useEffect(() => {
    setRandomBanner(banners.length)
    if (!!user) {
      navigate('/groups')
    }
  }, [])

  const themePrefer = React.useMemo(
    () =>
      DefaultTheme('dark'),
    [],
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
      <ThemeProvider theme={themePrefer}>
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
          <Container component="main" maxWidth="xs" sx={{ bgcolor: 'rgb(0 0 0 / 80%)', }}>

            <Box
              sx={{
                marginTop: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box sx={{ mb: 2 }} alignContent='center' >
                <img alt="NiverDeQuem Logo" width="90%" src={require('./../../shared/images/logo_niver.png')} />
              </Box>


              <Typography component="h1" variant="h5">
                <CakeSharpIcon /> Falta pouco!
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

                {

                  loading ?

                    <Box sx={{ m: 5, display: 'flex', justifyContent: 'center' }}>
                      <CircularProgress color='secondary' disableShrink />
                    </Box>

                    :

                    ''
                }
                <Button
                  type="button"
                  disabled={!(emailUser && userName && birthdayDate && passUser && passUserConfirm)}
                  fullWidth
                  onClick={handleRegister}
                  variant="contained"
                  sx={{ mt: 3, }}
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
            <Copyright sx={{ mt: 2 }} />
          </Container>
        </Grid>
      </ThemeProvider>
    </LocalizationProvider>
  );
}
