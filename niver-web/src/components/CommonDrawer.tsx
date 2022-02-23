import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Tooltip, Typography } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import React, { useContext } from 'react';
import IMemberData from '../shared/types/Member';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from "react-router-dom";
import AuthContext from '../context/auth';


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

  return (
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
          {/* {person?.name} */}
        <Typography variant="subtitle2" textAlign="center" sx={{ margin: 1 }}>
          {namePerson?.split(" ")[0]}
        </Typography>
      </Box>
      <Divider />
      <List>
        <ListItem button key="Meu perfil" onClick={() => navigate('/profile')}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Meu perfil" />
        </ListItem>
        <ListItem button key="Grupos" onClick={() => navigate('/groups')}>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary="Grupos" />
        </ListItem>
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
  )
}