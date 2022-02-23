import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import AddBox from '@mui/icons-material/AddBox';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Avatar, Button, Checkbox, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Grid, Hidden, InputAdornment, Link, TextField } from '@mui/material';
import IGroupData from '../../shared/types/Group';
import { GroupService } from '../../services/GroupService';
import { GroupAccordion } from '../../components/GroupAccordion';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import IPersonData from '../../shared/types/Person';
import { PersonService } from '../../services/PersonService';
import AuthContext from '../../context/auth';
import { CommonDrawer } from '../../components';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { ptBR } from "date-fns/locale";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { AuthenticationService } from '../../services/AuthenticationService';
import { useSnackbar } from 'notistack';

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
  const { user } = useContext(AuthContext);
  const [birthdayDate, setBirthdayDate] = useState<Date | undefined>(person?.birthday);
  const [emailUser, setEmailUser] = useState(person?.email);
  const [userName, setUserName] = useState(person?.name);
  const [passUser, setPassUser] = useState('');
  const [passUserConfirm, setPassUserConfirm] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    PersonService.getPersonById(user!).then(({ status, data }) => {
      if (status === 200) {
        setPerson(data)
      }
    })
  }, [])

  useEffect(() => {
    setBirthdayDate(person?.birthday)
    setEmailUser(person?.email)
    setUserName(person?.name)
    setPassUser('')
    setPassUserConfirm('')
  }, [person])


  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleEdit = async () => {
    setPassUserConfirm('')
    setPassUser('')
    setBirthdayDate(person?.birthday)
    setEmailUser(person?.email)
    setUserName(person?.name)
    setEditButton(!editButton)
  }
  const handleConfirm = async () => {
      if (passUser && passUser.length >= 6) {
        await PersonService.updatePerson({ "idPerson": user, "name": userName, "birthday": birthdayDate!, "email": emailUser, "confirmPassword": passUser })
          .then((response) => {
            console.log(response)
            enqueueSnackbar('Alterações realizadas ✔️')
            setPerson({idPerson : user, name: userName, email: emailUser, birthday: birthdayDate})
            setEditButton(false)
          }).catch((error) => {
            console.log(error)
            if(error.response?.status === 401){
              enqueueSnackbar('Senha incorreta 🤡')
            }else{
              enqueueSnackbar('Serviço indisponível, tente novamente mais tarde 😨')
            }
          })
      } else {
        enqueueSnackbar('Confirme sua senha atual para alterar os dados 🔑')
      }
  };

  const container = window !== undefined ? () => window().document.body : undefined;

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
              <Box component="form" noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="name"
                      required
                      disabled={!editButton}
                      fullWidth
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
                      variant="standard"
                      onChange={(e) => { setEmailUser(e.target.value?.toLowerCase()) }}
                      value={emailUser}
                      autoComplete="email"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
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
                      sx={{ visibility: editButton ? 'visible' : 'hidden' }}
                      name="password"
                      label="Confirme sua senha atual"
                      type="password"
                      variant="standard"
                      id="password"
                      onChange={(e) => setPassUser(e.target.value)}
                      value={passUser}
                      autoComplete="new-password"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
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
                  sx={{ mt: 3, mb: 2 }}
                >
                  {!editButton ? 'Alterar' : 'Cancelar'}
                </Button>
                <Button
                  type="button"
                  color="success"
                  disabled={person?.name === userName && person?.email === emailUser && person?.birthday === birthdayDate}
                  fullWidth
                  sx={{ mt: 3, mb: 2, visibility: editButton ? 'visible' : 'hidden' }}
                  onClick={handleConfirm}
                  variant="contained"
                >
                  Confirmar
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box >
    </LocalizationProvider>
  );
}