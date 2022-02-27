import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, List, ListItem, ListItemAvatar, ListItemText, Tooltip } from '@mui/material';
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
  const [openDialogRemoveMemberGroup, setOpenDialogRemoveMemberGroup] = React.useState(false);

  const handleClickOpenDialogRemoveMemberGroup = () => {
    setOpenDialogRemoveMemberGroup(true);
  };

  const handleCloseDialogRemoveMemberGroup = () => {
    setOpenDialogRemoveMemberGroup(false);
  };

  const handleConfirmRemoveMemberGroup = (idPersonRemove: number, idGroup: number) => {
    onDeleteMember(idPersonRemove, idGroup)
    setOpenDialogRemoveMemberGroup(false);
  }

  return (
    <ListItem
      secondaryAction={
        member?.idPerson === idPerson ? null :
          idPerson === idOwner ?
            <Tooltip title="Remover">
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={handleClickOpenDialogRemoveMemberGroup}>
                <RemoveCircleIcon />
              </IconButton>
            </Tooltip> : null
      }>
      <ListItemAvatar>
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}></Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={member?.idPerson === idPerson ? 'Você '  : member?.name}
        secondary={member?.idPerson === idOwner ? 'Dono do Grupo' + ' ' + member?.birthday + ' 🎂': ' ' + member?.birthday + ' 🎂'}
      />

      <Dialog open={openDialogRemoveMemberGroup} onClose={handleCloseDialogRemoveMemberGroup}>
        <DialogTitle>Remover membro do grupo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja remover "<strong>{member?.name}</strong>" do grupo?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogRemoveMemberGroup}>Cancelar</Button>
          <Button onClick={() => handleConfirmRemoveMemberGroup(member?.idPerson, idGroup)}>Sim</Button>
        </DialogActions>
      </Dialog>

    </ListItem>

  )
}