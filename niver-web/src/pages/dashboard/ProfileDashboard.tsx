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
import { Avatar, Button, Checkbox, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Grid, Link, TextField } from '@mui/material';
import IGroupData from '../../shared/types/Group';
import { GroupService } from '../../services/GroupService';
import { GroupAccordion } from '../../components/GroupAccordion';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
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
  const [person, setPerson ] = useState<IPersonData>();
  const [nameGroup, setNameGroup] = useState('');
  const [groups, setGroups] = useState<Array<IGroupData>>([]);
  const {signed, user} = useContext(AuthContext);
  // const { groups, getGroupsByPerson, createGroup } = useGroups();
  const idPerson = 12;
  const [groupsIndex, setGroupsIndex] = useState(0);

  useEffect(() => {
    PersonService.getPersonById(user!).then(({ status, data }) => {
      if (status === 200) {
        setPerson(data)
      }
    })
  }, [])

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
          <ListItem button key={text}>
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
                    name="firstName"
                    required
                    disabled
                    fullWidth
                    label="Nome"
                    variant="standard"
                    value={person?.name}
                    id="firstName"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    disabled
                    fullWidth
                    id="email"
                    label="Seu melhor email"
                    name="email"
                    variant="standard"
                    value={person?.email}
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    disabled
                    fullWidth
                    name="password"
                    label="A melhor senha da sua vida"
                    type="password"
                    variant="standard"
                    id="password"
                    value="testesteste"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Alterar
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box >
  );
}