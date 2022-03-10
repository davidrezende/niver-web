import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import GroupsIcon from '@mui/icons-material/Groups';
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar, Box, Button, Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import AuthContext from '../context/auth';


type ListProps = {
  namePerson?: string;
};

export const CommonDrawer: React.FC<ListProps> = ({ namePerson }) => {
  const { Logout } = useContext(AuthContext);
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