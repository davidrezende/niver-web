import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText, Tooltip } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import React from 'react';
import IMemberData from '../../shared/types/Member';

type ListProps = {
  members?: IMemberData[];
  idPerson?: number;
  idOwner?: number;
};

export const ListMemberGroupCp: React.FC<ListProps> = ({ members, idPerson, idOwner }) => {
  return (
    <div>
      <List>
        {members == null ? <p>Nenhum integrante encontrado</p> : members.map((member, index) => (
          <ListItem
            secondaryAction={
              member.id === idPerson ? null :
                idPerson === idOwner ?
                <Tooltip title="Remover">
                      <IconButton edge="end" aria-label="delete">
                        <RemoveCircleIcon />
                      </IconButton> 
                </Tooltip> : null
            }>
            <ListItemAvatar>
              <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}></Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={member.id === idPerson ? "Você" : member.name}
              secondary={member.id === idOwner ? "Dono do Grupo" : null}
            />
          </ListItem>
        ))}
      </List>
    </div>
  )
}