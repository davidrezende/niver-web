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
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Avatar, Button, CircularProgress, CustomTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, PaletteMode, Paper, Stack, styled, Switch, TextField, ThemeProvider, useTheme, Zoom } from '@mui/material';
import IGroupData from '../../shared/types/Group';
import { GroupService } from '../../services/GroupService';
import { GroupAccordion } from '../../components/GroupAccordion';
import CalendarBirthdays from '../../components/CalendarBirthdays';
import IPersonData from '../../shared/types/Person';
import { PersonService } from '../../services/PersonService';
import AuthContext from '../../context/auth';
import { useNavigate } from "react-router-dom";
import { CommonDrawer, DialogNewGroup } from '../../components';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { ptBR } from "date-fns/locale";
import { LocalizationProvider } from '@mui/lab';
import { AppBarDashboard } from '../../components/AppBarDashboard';
import { DarkTheme } from '../../shared/themes/Dark';
import { DefaultTheme } from '../../shared/themes/Default';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import useMediaQuery from '@mui/material/useMediaQuery';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}


export default function ResponsiveDrawer(props: Props) {
  const [person, setPerson] = useState<IPersonData>();
  const [nameGroup, setNameGroup] = useState('');
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [themeSwitch, setThemeSwitch] = useState(prefersDarkMode);
  const [loadingGroups, setLoadingGroups] = useState(false);
  const [groups, setGroups] = useState<Array<IGroupData>>([]);
  // const { groups, getGroupsByPerson, createGroup } = useGroups();
  const [groupsIndex, setGroupsIndex] = useState(0);
  const { signed, user, Logout } = useContext(AuthContext);

  console.log('prefeeers escolhidooooooooo:', prefersDarkMode)
  // const theme = DarkTheme;
  let navigate = useNavigate();
  useEffect(() => {
    if (!!localStorage.getItem('themeDefault') && localStorage.getItem('themeDefault') !== null && localStorage.getItem('themeDefault') !== undefined) {
      console.log('ta guardaod no storage o tema:', localStorage.getItem('themeDefault'))
      setThemeSwitch(localStorage.getItem('themeDefault') === 'true' ? true : false)
    } else {
      console.log('setando o thema precerido do navegador:', prefersDarkMode)
      localStorage.setItem('themeDefault', prefersDarkMode.toString())
      setThemeSwitch(prefersDarkMode)
    }
    if (!!!user) {
      console.log('usuario n esta logado na tela de grupo, vai pro login')
      return navigate('/login')
    } else {
      console.log('buscando dados da pessoa logada na tela de group:', user!)
      PersonService.getPersonById(user!).then(({ status, data, config }) => {
        if (status === 200) {
          setPerson(data)
        }
      })
    }
  }, [])

  useEffect(() => {
    if (!!localStorage.getItem('themeDefault') && localStorage.getItem('themeDefault') !== null && localStorage.getItem('themeDefault') !== undefined) {
      console.log('ta guardaod no storage o tema:', localStorage.getItem('themeDefault'))
      setThemeSwitch(localStorage.getItem('themeDefault') === 'true' ? true : false)
    } else {
      console.log('setando o thema precerido do navegador:', prefersDarkMode)
      localStorage.setItem('themeDefault', prefersDarkMode.toString())
      setThemeSwitch(prefersDarkMode)
    }
    console.log('buscando dados dos grupos da pessoa logada')
    setLoadingGroups(true)
    delay(2000)
    GroupService.getGroupsByPerson(user!).then(({ status, data }) => {
      if (status === 200) {
        setLoadingGroups(false)
        setGroups(data)
      }
    })
  }, [person])


  const themePrefer = React.useMemo(
    () =>
      DefaultTheme(themeSwitch ? 'dark' : 'light'),
    [themeSwitch],
  );


  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const handleRegisterNewGroup = async (nameGroup: string) => {
    handleCloseDialogNewGroup();
    let { status, data } = await GroupService.createGroup({ owner: { idPerson: person?.idPerson }, name: nameGroup })
    if (status === 200) {
      setGroups([...groups, data])
    }
  }

  const handleGenerateInviteGroup = async (idGroup: number, idPerson: number) => {
    console.log('group:', idGroup, ' person:', idPerson)
    // let { status, data } = await GroupService.createGroup({ owner: { idPerson: person?.idPerson }, name: nameGroup })
    // if (status === 200) {
    //   setGroups([...groups, data])
    // }
  }

  const handleDeleteGroup = async (idGroup: number, idPerson: number) => {
    if (groups.filter((group) => group.idGroup === idGroup)[0].owner !== idPerson) {
      let { status } = await GroupService.removeMemberFromGroupId(idPerson, idGroup)
      if (status === 200) {
        setGroups(groups.filter((group) => group.idGroup !== idGroup))
      }
    } else {
      let { status } = await GroupService.deleteGroupByGroupId(idGroup)
      if (status === 200) {
        setGroups(groups.filter((group) => group.idGroup !== idGroup))
      }
    }

  }


  const handleEditGroup = async (groupEdit: IGroupData) => {
    console.log('objeto' + JSON.stringify(groupEdit))
    let { status, data } = await GroupService.editGroup(groupEdit)
    if (status === 200) {
      console.log('objetoRetornoEditGroup:' + JSON.stringify(data))
      setGroups(groups.map(g => g.idGroup === data.idGroup ? data : g))
    }
  }

  const { window } = props;

  const [openDialogNewGroup, setOpenDialogNewGroup] = React.useState(false);

  const handleClickOpenDialogNewGroup = () => {
    setOpenDialogNewGroup(true);
  };

  const handleCloseDialogNewGroup = () => {
    setOpenDialogNewGroup(false);
  };

  const handleChangeToggleTheme = () => {
    const themeAlt = !themeSwitch
    localStorage.setItem('themeDefault', themeAlt.toString())
    setThemeSwitch(themeAlt)
  }


  const drawerWidth = 240;
  const container = window !== undefined ? () => window().document.body : undefined;
  const Item = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  }));

  return (
    <ThemeProvider theme={themePrefer}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <AppBarDashboard title="Seus grupos" namePerson={person?.name} />

        <Box sx={{ display: 'flex', flexGrow: 1 }}>

          <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
          >
            <Toolbar />

            <Box
              sx={{ flexGrow: 1 }}
            // sx={{ flexDirection: 'row', alignItems: 'center'}}
            >
              <Button variant="contained" onClick={handleClickOpenDialogNewGroup} size="large" startIcon={<AddBox />}>
                Novo Grupo
              </Button>

              <IconButton sx={{ ml: 1 }} onClick={handleChangeToggleTheme} color="inherit">
                {themePrefer.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
              <Button onClick={handleChangeToggleTheme}>{themePrefer.palette.mode === 'dark' ? 'Modo claro' : 'Modo escuro'}</Button>
              {/* 
          <Dialog open={openDialogNewGroup} onClose={handleCloseDialogNewGroup}>
            <DialogTitle>Novo Grupo</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Crie um grupo com seus amigos para ser lembrado quando o aniversário de algum deles estiver próximo.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="nameGroup"
                type="input"
                label="Nome do grupo"
                value={nameGroup}
                fullWidth
                inputProps={{ maxLength: 15 }}
                error={nameGroup.length <= 0 || nameGroup.length > 15}
                helperText={nameGroup.length <= 0 || nameGroup.length > 15 ? "Nome do grupo precisa ter entre 1 a 15 caracteres" : ""}
                variant="standard"
                onChange={(e) => setNameGroup(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialogNewGroup}>Cancelar</Button>
              <Button onClick={handleRegisterNewGroup} disabled={nameGroup.length <= 0 || nameGroup.length > 15} >Confirmar</Button>
            </DialogActions>
          </Dialog> */}


              <DialogNewGroup handleCloseDialogNewGroup={handleCloseDialogNewGroup} handleRegisterNewGroup={handleRegisterNewGroup} openDialogNewGroup={openDialogNewGroup} />

              <Divider sx={{ margin: 1 }} />
              <Grid container spacing={2}
              // sx={{
              //   display: 'flex',
              //   flexDirection: 'row',
              //   alignItems: 'center',
              // }}
              >
                <Grid item xs
                // sx={{
                //   width: '100%',
                // }}
                >
                  <Item sx={{ backgroundColor: 'transparent' }}>
                    {

                      loadingGroups ?

                        <Box sx={{ m: 5, display: 'flex', justifyContent: 'center' }}>
                          <CircularProgress color='secondary' disableShrink />
                        </Box>

                        :

                        groups.length > 0 ?

                          groups.map((group, indexGroup) => (
                            <GroupAccordion
                              group={group}
                              key={group.idGroup}
                              idPerson={person?.idPerson}
                              onDelete={handleDeleteGroup}
                              onEdit={handleEditGroup}
                              onInvite={handleGenerateInviteGroup} />
                          ))
                          :
                          <Box>
                            <Zoom in={groups.length <= 0} style={{ transitionDelay: groups.length <= 0 ? '500ms' : '0ms' }}>
                              <Box sx={{ mt: 2, display: 'flex', p: 1, borderRadius: 6, color: 'white', width: '100%', backgroundColor: 'rgb(0 0 0 / 10%)' }}>
                                <Typography component="h2" variant="h6">
                                  <Typography sx={{ fontWeight: 'bold' }} color="rgb(0 121 217)" component="div">Estagiário 🤖:</Typography> Olá!  Que bom te ver por aqui <Typography color="orange" component="span" variant="h6">{person?.name!.split(" ")[0]}</Typography> ! 🖖
                                </Typography>
                              </Box>
                            </Zoom>
                            <Zoom in={groups.length <= 0} style={{ transitionDelay: groups.length <= 0 ? '1500ms' : '0ms' }}>
                              <Box sx={{ mt: 2, display: 'flex', p: 1, borderRadius: 6, color: 'white', width: '100%', backgroundColor: 'rgb(0 0 0 / 10%)' }}>
                                <Typography component="h2" variant="h6">
                                  <Typography sx={{ fontWeight: 'bold' }} color="rgb(0 121 217)" component="div">Estagiário 🤖:</Typography> Já vi aqui que você ainda não tem nenhum grupo criado ainda.
                                </Typography>
                              </Box>
                            </Zoom>
                            <Zoom in={groups.length <= 0} style={{ transitionDelay: groups.length <= 0 ? '2500ms' : '0ms' }}>
                              <Box sx={{ mt: 2, display: 'flex', p: 1, borderRadius: 6, color: 'white', width: '100%', backgroundColor: 'rgb(0 0 0 / 10%)' }}>
                                <Typography component="h2" variant="h6">
                                  <Typography sx={{ fontWeight: 'bold' }} color="rgb(0 121 217)" component="div"><strong>Estagiário 🤖:</strong></Typography> Comece criando seu primeiro grupo no botão <Typography color="orange" component="span" variant="h6">"Novo Grupo"</Typography> acima.
                                </Typography>
                              </Box>
                            </Zoom>
                          </Box>
                    }
                  </Item>
                </Grid>
                <Grid item xs
                // sx={{
                //   display: 'flex',
                //   flexDirection: 'collumn',
                //   alignItems: 'center',
                // }}
                >
                  {
                    groups.length > 0 ?

                      <Stack direction="row" justifyContent="center">
                        <Item sx={{ backgroundColor: 'transparent' }}>
                          <CalendarBirthdays />
                        </Item>
                      </Stack>

                      :

                      <div></div>

                  }

                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box >
      </Box>
    </ThemeProvider>
  );
}