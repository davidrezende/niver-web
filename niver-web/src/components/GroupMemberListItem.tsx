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

  const randColor = (param: number) => {
    return "#" + Math.floor(param * 1675).toString(16).padStart(6, '0').toUpperCase();
  }

  function dataFormatada(dataParam: Date): string {
    var data = new Date(dataParam),
      dia = data.getDate().toString(),
      diaF = (dia.length == 1) ? '0' + dia : dia,
      mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
      mesF = (mes.length == 1) ? '0' + mes : mes,
      anoF = data.getFullYear();
    return diaF + "/" + mesF + "/" + anoF;
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
        <Avatar sx={{ color: 'white', m: 1, bgcolor: () => randColor(member?.name?.length!) }}>{member?.name?.split(" ")[0].charAt(0).concat(member?.name?.split(" ")[0].charAt(member?.name.length - 1)).toUpperCase()}</Avatar>

        {/* <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}></Avatar> */}
      </ListItemAvatar>
      <Tooltip title={member?.idPerson === idOwner ? 'Criador 👑 ( Apenas o criador pode gerar um convite para o grupo )' : ''} placement='right-end' >
      <ListItemText
        primaryTypographyProps={{
          color: 'white',
          fontFamily: 'Roboto',
          fontWeight: 'bold',
          variant: 'body2',
        }}
        secondaryTypographyProps={{
          color: 'rgb(233, 233, 233 )',
          fontFamily: 'Roboto',
          fontSize: 12,
          variant: 'body2',
        }}
        primary={
              (member?.idPerson === idPerson ? 'Você '  : member?.name!)?.concat(member?.idPerson === idOwner ? ' 👑' : '')
        }
        secondary={dataFormatada(member?.birthday!) + ' 🎁'}
      />
      </Tooltip>
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