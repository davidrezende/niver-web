import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
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
  window?: () => Window;
}


export default function ResponsiveDrawer(props: Props) {
  const [person, setPerson] = useState<IPersonData>();
  const [nameGroup, setNameGroup] = useState('');
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [themeSwitch, setThemeSwitch] = useState(prefersDarkMode);
  const [loadingGroups, setLoadingGroups] = useState(false);
  const [groups, setGroups] = useState<Array<IGroupData>>([]);
  const { user } = useContext(AuthContext);

  let navigate = useNavigate();
  useEffect(() => {
    if (!!localStorage.getItem('themeDefault') && localStorage.getItem('themeDefault') !== null && localStorage.getItem('themeDefault') !== undefined) {
      setThemeSwitch(localStorage.getItem('themeDefault') === 'true' ? true : false)
    } else {
      localStorage.setItem('themeDefault', prefersDarkMode.toString())
      setThemeSwitch(prefersDarkMode)
    }
    if (!!!user) {
      return navigate('/login')
    } else {
      PersonService.getPersonById(user!).then(({ status, data, config }) => {
        if (status === 200) {
          setPerson(data)
        }
      })
    }
  }, [])

  useEffect(() => {
    if (!!localStorage.getItem('themeDefault') && localStorage.getItem('themeDefault') !== null && localStorage.getItem('themeDefault') !== undefined) {
      setThemeSwitch(localStorage.getItem('themeDefault') === 'true' ? true : false)
    } else {
      localStorage.setItem('themeDefault', prefersDarkMode.toString())
      setThemeSwitch(prefersDarkMode)
    }
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
    let { status, data } = await GroupService.editGroup(groupEdit)
    if (status === 200) {
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
            >
              <Button variant="contained" onClick={handleClickOpenDialogNewGroup} size="large" startIcon={<AddBox />}>
                Novo Grupo
              </Button>

              <IconButton sx={{ ml: 1 }} onClick={handleChangeToggleTheme} color="inherit">
                {themePrefer.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
              <Button onClick={handleChangeToggleTheme}>{themePrefer.palette.mode === 'dark' ? 'Modo claro' : 'Modo escuro'}</Button>


              <DialogNewGroup handleCloseDialogNewGroup={handleCloseDialogNewGroup} handleRegisterNewGroup={handleRegisterNewGroup} openDialogNewGroup={openDialogNewGroup} />

              <Divider sx={{ margin: 1 }} />
              <Grid container spacing={2}>
                <Grid item xs>
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
                            />
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
                <Grid item xs>
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