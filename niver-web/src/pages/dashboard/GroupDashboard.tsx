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
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from '@mui/material';
import IGroupData from '../../shared/types/Group';
import { GroupService } from '../../services/GroupService';
import { GroupAccordion } from '../../components/GroupAccordion';
import CalendarBirthdays from '../../components/CalendarBirthdays';
import IPersonData from '../../shared/types/Person';
import { PersonService } from '../../services/PersonService';
import AuthContext from '../../context/auth';

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
  const [nameGroup, setNameGroup] = useState('');
  const [groups, setGroups] = useState<Array<IGroupData>>([]);
  // const { groups, getGroupsByPerson, createGroup } = useGroups();
  const [groupsIndex, setGroupsIndex] = useState(0);
  const {signed, user, Logout} = useContext(AuthContext);
   
  useEffect(() => {
    console.log('buscando dados da pessoa logada')
    PersonService.getPersonById(user!).then(({ status, data, config }) => {
      if (status === 200) {
        setPerson(data)
      }
    })

  }, [])

  useEffect(() => {
    console.log('buscando dados dos grupos da pessoa logada')
    GroupService.getGroupsByPerson(user!).then(({ status, data }) => {
      if (status === 200) {
        setGroups(data)
      }
    })
  }, [person])


  const handleRegisterNewGroup = async () => {
    handleCloseDialogNewGroup();
    console.log('person:', JSON.stringify(person))
    let { status, data } = await GroupService.createGroup({ owner: { idPerson: person?.idPerson }, name: nameGroup })
    if (status === 200) {
      setGroups([...groups, data])
    }
    setNameGroup('');
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
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [openDialogNewGroup, setOpenDialogNewGroup] = React.useState(false);

  const handleClickOpenDialogNewGroup = () => {
    setOpenDialogNewGroup(true);
  };

  const handleCloseDialogNewGroup = () => {
    setOpenDialogNewGroup(false);
  };

  async function handleLogout() {
    Logout();
  }

  const drawer = (
    <div>
      <Box
        sx={{
          margin: 0.5,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
        <Typography textAlign="center" sx={{ margin: 1 }}>
          {person?.name}</Typography>
      </Box>
      <Divider />
      <List>
        {['Meu perfil', 'Grupos'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Sair'].map((text, index) => (
          <ListItem onClick={handleLogout} button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
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
            Grupos
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
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
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
          <Button variant="contained" onClick={handleClickOpenDialogNewGroup} size="large" startIcon={<AddBox />}>
            Novo Grupo
          </Button>

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
                variant="standard"
                onChange={(e) => setNameGroup(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialogNewGroup}>Cancelar</Button>
              <Button onClick={handleRegisterNewGroup}>Confirmar</Button>
            </DialogActions>
          </Dialog>


          <Divider sx={{ margin: 1 }} />
          <Grid container spacing={2}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Grid item xs={8}
              sx={{
                width: '100%',
              }}
            >
              {
                groups.map((group, indexGroup) => (
                  <GroupAccordion group={group} key={group.idGroup} idPerson={person?.idPerson} onDelete={handleDeleteGroup} onEdit={handleEditGroup} />
                ))
              }
            </Grid>
            <Grid item xs={4}
              sx={{
                display: 'flex',
                flexDirection: 'collumn',
                alignItems: 'center',
              }}
            >
              <CalendarBirthdays />
            </Grid>
          </Grid>

          {/* <AccordionCp groups={groups} idPerson={idPerson} onDelete={handleDeleteGroup} selectedIndex={groupsIndex} onClick={setGroupsIndex} /> */}
        </Box>
      </Box>
    </Box >
  );
}