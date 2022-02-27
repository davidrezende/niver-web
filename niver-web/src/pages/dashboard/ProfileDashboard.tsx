import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useContext, useEffect, useState } from 'react';
import { Avatar, Button, CircularProgress, Grid, InputAdornment, Link, TextField } from '@mui/material';
import IPersonData from '../../shared/types/Person';
import { PersonService } from '../../services/PersonService';
import AuthContext from '../../context/auth';
import { CommonDrawer } from '../../components';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { ptBR } from "date-fns/locale";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useSnackbar } from 'notistack';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {

  const [person, setPerson] = useState<IPersonData>();
  const [editButton, setEditButton] = useState(false);
  const [editPasswordButton, setEditPasswordButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const [birthdayDate, setBirthdayDate] = useState<Date | undefined>(person?.birthday);
  const [emailUser, setEmailUser] = useState(person?.email);
  const [userName, setUserName] = useState(person?.name);
  const [passUser, setPassUser] = useState('');
  const [oldPassUser, setOldPassUser] = useState('');
  const [newPassUser, setNewPassUser] = useState('');
  const [newConfirmPassUser, setNewConfirmPassUser] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    if (!!!user) {
      return navigate('/login')
    }
    setLoading(true)
    delay(2000)
    PersonService.getPersonById(user!).then(({ status, data }) => {
      if (status === 200) {
        setPerson(data)
        setLoading(false)
      }
    })
  }, [])

  useEffect(() => {
    setBirthdayDate(person?.birthday)
    setEmailUser(person?.email)
    setUserName(person?.name)
    setPassUser('')
    setNewConfirmPassUser('')
    setNewPassUser('')
    setOldPassUser('')
  }, [person])


  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleEditPassword = async () => {
    setNewConfirmPassUser('')
    setNewPassUser('')
    setOldPassUser('')
    setEditPasswordButton(!editPasswordButton)
  }

  const handleEdit = async () => {
    setPassUser('')
    setBirthdayDate(person?.birthday)
    setEmailUser(person?.email)
    setUserName(person?.name)
    setEditButton(!editButton)
  }

  const handleConfirm = async () => {
    if (passUser && passUser.length >= 6) {
      setLoading(true)
      await delay(2000)
      await PersonService.updatePerson({ "idPerson": user, "name": userName, "birthday": birthdayDate!, "email": emailUser, "confirmPassword": passUser })
        .then((response) => {
          console.log(response)
          enqueueSnackbar('Alterações realizadas ✔️')
          setPerson({ idPerson: user, name: userName, email: emailUser, birthday: birthdayDate })
          setEditButton(false)
          setLoading(false)
        }).catch((error) => {
          console.log(error)
          if (error.response?.status === 401) {
            enqueueSnackbar('Senha atual incorreta 🤡')
          } else {
            enqueueSnackbar('Serviço indisponível, tente novamente mais tarde 😨')
          }
        })
    } else {
      enqueueSnackbar('Confirme sua senha atual para alterar os dados 🔑')
    }
  };


  const handleConfirmPasswordChange = async () => {
    if (oldPassUser.length < 6 && newPassUser.length < 6 && newConfirmPassUser.length < 6) {
      return enqueueSnackbar('As senhas precisam ter pelo menos 6 caracteres 🔑')
    }
    if (newPassUser !== newConfirmPassUser) {
      return enqueueSnackbar('As senhas digitadas não coincidem 😨')
    }

    setLoading(true)
    await delay(2000)
    await PersonService.updatePasswordPerson({ "idPerson": user, "password": oldPassUser, "newPassword": newPassUser })
      .then((response) => {
        console.log(response)
        setLoading(false)
        enqueueSnackbar('Senha alterada ✔️')
        setEditPasswordButton(false)
      }).catch((error) => {
        console.log(error)
        if (error.response?.status === 401) {
          enqueueSnackbar('Senha atual incorreta 🤡')
        } else {
          enqueueSnackbar('Serviço indisponível, tente novamente mais tarde 😨')
        }
      })
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  const randColor = (param: number) => {
    return "#" + Math.floor(param * 1675).toString(16).padStart(6, '0').toUpperCase();
  }

  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Seus dados
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            <CommonDrawer namePerson={person?.name} />
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            <CommonDrawer namePerson={person?.name} />
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Toolbar />

          <Box
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                marginTop: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >

              {

                loading ?

                  <Box sx={{ m: 5, display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress color='secondary' disableShrink />
                  </Box>

                  :
              <Avatar sx={{ fontSize: '100%', width: 100, height: 100, m: 1, bgcolor: () => randColor(person?.name?.length!) }}>{person?.name?.split(" ")[0].charAt(0).concat(person?.name?.split(" ")[0].charAt(person?.name.length - 1)).toUpperCase()}</Avatar>
              }
              <Box sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="name"
                      required
                      disabled={!editButton}
                      fullWidth
                      inputProps={{ maxLength: 25 }}
                      label="Nome"
                      variant="standard"
                      value={userName}
                      onChange={(e) => { setUserName(e.target.value) }}
                      id="name"
                      autoFocus
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      disableFuture
                      disabled={!editButton}
                      label="Data de Nascimento"
                      openTo="year"
                      views={['year', 'month', 'day']}
                      value={birthdayDate}
                      onChange={(newValue) => {
                        setBirthdayDate(newValue!);
                      }}
                      renderInput={(params) => <TextField required variant='standard' {...params} />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      disabled={!editButton}
                      fullWidth
                      id="email"
                      label="Seu melhor email"
                      name="email"
                      inputProps={{ maxLength: 50 }}
                      variant="standard"
                      onChange={(e) => { setEmailUser(e.target.value?.toLowerCase()) }}
                      value={emailUser}
                      autoComplete="email"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AlternateEmailIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      disabled={!editButton}
                      error={passUser.length < 6}
                      fullWidth
                      sx={{ display: editButton ? 'block' : 'none' }}
                      name="password"
                      label="Confirme sua senha atual"
                      inputProps={{ maxLength: 50 }}
                      type="password"
                      variant="standard"
                      id="password"
                      onChange={(e) => setPassUser(e.target.value)}
                      value={passUser}
                      autoComplete="new-password"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <VpnKeyIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="button"
                  fullWidth
                  onClick={handleEdit}
                  variant="contained"
                  sx={{ mt: 1, mb: 2 }}
                >
                  {!editButton ? 'Alterar' : 'Cancelar'}
                </Button>
                <Button
                  type="button"
                  color="success"
                  disabled={person?.name === userName && person?.email === emailUser && person?.birthday === birthdayDate}
                  fullWidth
                  sx={{ mb: 2, display: editButton ? 'block' : 'none' }}
                  onClick={handleConfirm}
                  variant="contained"
                >
                  Confirmar
                </Button>

                <Divider />
                <Box>
                  <Grid container spacing={2} sx={{ mt: 5, display: editPasswordButton ? 'block' : 'none' }}>
                    <Grid item xs={12} >
                      <TextField
                        required
                        disabled={!editPasswordButton}
                        error={oldPassUser.length < 6}
                        fullWidth
                        name="passwordCurrent"
                        label="Confirme sua senha atual"
                        type="password"
                        inputProps={{ maxLength: 50 }}
                        variant="standard"
                        id="passwordCurrent"
                        onChange={(e) => setOldPassUser(e.target.value)}
                        value={oldPassUser}
                        autoComplete="new-password"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <VpnKeyIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        disabled={!editPasswordButton}
                        error={newPassUser.length < 6}
                        fullWidth
                        name="passwordNew"
                        label="Sua nova senha"
                        type="password"
                        variant="standard"
                        inputProps={{ maxLength: 50 }}
                        id="passwordNew"
                        onChange={(e) => setNewPassUser(e.target.value)}
                        value={newPassUser}
                        autoComplete="new-password"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <VpnKeyIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        disabled={!editPasswordButton}
                        error={newConfirmPassUser.length < 6}
                        fullWidth
                        name="passwordNewConfirm"
                        label="Confirme sua nova senha"
                        type="password"
                        inputProps={{ maxLength: 50 }}
                        variant="standard"
                        id="passwordNewConfirm"
                        onChange={(e) => setNewConfirmPassUser(e.target.value)}
                        value={newConfirmPassUser}
                        autoComplete="new-password"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <VpnKeyIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="button"
                    fullWidth
                    onClick={handleEditPassword}
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {!editPasswordButton ? 'Alterar Senha' : 'Cancelar'}
                  </Button>
                  <Button
                    type="button"
                    color="success"
                    disabled={oldPassUser.length < 6 || newPassUser.length < 6 || newConfirmPassUser.length < 6 || (oldPassUser === newPassUser && newPassUser === newConfirmPassUser)}
                    fullWidth
                    sx={{ mb: 2, visibility: editPasswordButton ? 'visible' : 'hidden' }}
                    onClick={handleConfirmPasswordChange}
                    variant="contained"
                  >
                    Confirmar
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box >
    </LocalizationProvider>
  );
}