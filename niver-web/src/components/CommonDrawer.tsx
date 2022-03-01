import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Tooltip, Typography } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import React, { useContext } from 'react';
import IMemberData from '../shared/types/Member';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from "react-router-dom";
import AuthContext from '../context/auth';
import LogoutIcon from '@mui/icons-material/Logout';
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';


type ListProps = {
  namePerson?: string;
};

export const CommonDrawer: React.FC<ListProps> = ({ namePerson }) => {
  const { signed, user, Logout } = useContext(AuthContext);
  let navigate = useNavigate();

  async function handleLogout() {
    Logout()
    navigate('/login')
  }

  const randColor = (param: number) => {
    return "#" + Math.floor(param * 1675).toString(16).padStart(6, '0').toUpperCase();
  }

  return (
    <div>
      <Box
        sx={{
          margin: 0.5,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Button onClick={() => navigate('/profile') }>
        <Avatar sx={{ color: 'white', m: 1, bgcolor: () => randColor(namePerson?.length!) }}>{namePerson?.split(" ")[0].charAt(0).concat(namePerson?.split(" ")[0].charAt(namePerson.length - 1)).toUpperCase()}</Avatar>
        {/* {person?.name} */}
        <Typography variant="subtitle2" textAlign="center" sx={{ margin: 1 }}>
          {namePerson?.split(" ")[0].substring(0, 15)}
        </Typography>
        </Button>
      </Box>
      <Divider />
      <List>
        <ListItem button key="Meu perfil" onClick={() => navigate('/profile')}>
          <ListItemIcon>
            <AssignmentIndIcon />
          </ListItemIcon>
          <ListItemText primary="Meu perfil" />
        </ListItem>
        <ListItem button key="Grupos" onClick={() => navigate('/groups')}>
          <ListItemIcon>
            <GroupsIcon />
          </ListItemIcon>
          <ListItemText primary="Grupos" />
        </ListItem>
      </List>
      <Divider />
      <List>
        {['Sair'].map((text, index) => (
          <ListItem onClick={handleLogout} button key={text}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  )
}