import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText, Tooltip } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import React from 'react';
import IMemberData from '../shared/types/Member';

type ListProps = {
  member?: IMemberData;
  idPerson?: number;
  idOwner?: number;
  idGroup: number;
  onDeleteMember: (idPerson: number, idGroup: number) => void;
};

export const GroupMemberListItem: React.FC<ListProps> = ({ member, idPerson, idGroup, idOwner, onDeleteMember }) => {
  return (
    <ListItem
      secondaryAction={
        member?.idPerson === idPerson ? null :
          idPerson === idOwner ?
            <Tooltip title="Remover">
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => onDeleteMember(member?.idPerson, idGroup)}>
                <RemoveCircleIcon />
              </IconButton>
            </Tooltip> : null
      }>
      <ListItemAvatar>
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}></Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={member?.idPerson === idPerson ? "Você" : member?.name}
        secondary={member?.idPerson === idOwner ? "Dono do Grupo" : null}
      />
    </ListItem>
    
  )
}