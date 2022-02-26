import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import React, { useCallback, useEffect, useState } from 'react';
import { IconButton, styled, ListItem, Tooltip, AccordionDetails, TextField, List, DialogTitle, Dialog, DialogContentText, DialogActions, Button, DialogContent, Box, FilledInput, FormControl, InputLabel, Menu, MenuItem, Popper, MenuList, ClickAwayListener, Paper, Grow } from '@mui/material';
import Typography from '@mui/material/Typography';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Group from '@mui/icons-material/Group';
import ClearIcon from '@mui/icons-material/Clear';
import ModeEdit from '@mui/icons-material/ModeEdit';
import IGroupData from '../shared/types/Group';
import { GroupMemberListItem } from './GroupMemberListItem';
import { GroupService } from '../services/GroupService';
import IMemberData from '../shared/types/Member';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CopyToClipboard from './CopyToClipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CachedIcon from '@mui/icons-material/Cached';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';



type ListProps = {
  group: IGroupData;
  onDelete: (idGroup: number, idPerson: number) => void;
  onEdit: (group: IGroupData) => void;
  onInvite: (idGroup: number, idPerson: number) => void;
  idPerson: number;
};


export const GroupAccordion: React.FC<ListProps> = ({ group, idPerson, onDelete, onEdit, onInvite }) => {
  const [edit, setEdit] = useState(false)
  const [openAccordion, setOpenAccordion] = useState(false)
  const [groupName, setGroupName] = useState(group.name)
  const [inviteLink, setInviteLink] = useState('')
  const [members, setMembers] = useState(group.members)
  const [openDialogDeleteGroup, setOpenDialogDeleteGroup] = React.useState(false);
  const [openDialogExitGroup, setOpenDialogExitGroup] = React.useState(false);
  const [openDialogInviteGroup, setOpenDialogInviteGroup] = React.useState(false);

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickOpenDialogExitGroup = () => {
    handleCloseUserMenu()
    setOpenDialogExitGroup(true);
  };

  const handleCloseDialogExitGroup = () => {
    setOpenDialogExitGroup(false);
  };

  const handleClickOpenDialogInviteGroup = () => {
    handleCloseUserMenu()
    setOpenDialogInviteGroup(true);
  };

  const handleCloseDialogInviteGroup = () => {
    setOpenDialogInviteGroup(false);
  };

  const handleClickOpenDialogDeleteGroup = () => {
    handleCloseUserMenu()
    setOpenDialogDeleteGroup(true);
  };

  const handleCloseDialogDeleteGroup = () => {
    handleCloseUserMenu()
    setOpenDialogDeleteGroup(false);
  };

  const handleConfirmDialogDeleteGroup = (idGroup: number, idPerson: number) => {
    onDelete(idGroup, idPerson)
    setOpenDialogDeleteGroup(false)
  };

  const handleConfirmDialogExitGroup = (idGroup: number, idPerson: number) => {
    onDelete(idGroup, idPerson)
    setOpenDialogExitGroup(false);
  };


  const handleConfirmDialogInviteGroup = (idGroup: number, idPerson: number) => {
    onInvite(idGroup, idPerson)
    setOpenDialogInviteGroup(false);
  };

  const handleRemoveMember = async (idPerson: number, idGroup: number,) => {
    let { status } = await GroupService.removeMemberFromGroupId(idPerson, idGroup)
    if (status === 200) {
      setMembers(members?.filter((member) => member.idPerson !== idPerson))
    }
  }

  const handleEdit = () => {
    if (groupName) {
      onEdit({ ...group, name: groupName })
      setEdit(false)
    }
  }

  const handleCancelEdit = () => {
    handleCloseUserMenu()
    setEdit(false)
  }

  const handleCanEdit = () => {
    handleCloseUserMenu()
    setEdit(true)
  }

  return (

    <MuiAccordion sx={{ backgroundColor: 'rgb(0 82 151)', color: 'white' }}
      expanded={openAccordion}>
      <MuiAccordionSummary
        expandIcon={
          <IconButton
            onClick={() => setOpenAccordion(!openAccordion)}>
            <ExpandMoreIcon />
          </IconButton>
        }
        aria-controls="panel1a-content"
        id="panel1a-header">
        <ListItem>
          {
            !edit ?
              <Typography sx={{ margin: 0.5, display: 'flex', fontWeight: 'lighter', alignItems: 'center', fontSize: '100%' }}
                onClick={() => setOpenAccordion(!openAccordion)}>
                {group.owner?.idPerson === idPerson ? <ManageAccountsIcon sx={{ mr: 1 }} /> : <Group />} {group.name}
              </Typography>
              :
              <TextField
                fullWidth
                id="standard-basic"
                inputProps={{ maxLength: 15 }}
                error={groupName!.length <= 0 || groupName!.length > 15}
                helperText={groupName!.length <= 0 || groupName!.length > 15 ? "Nome do grupo precisa ter entre 1 a 15 caracteres" : ""}
                variant="standard" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
          }
        </ListItem>


        <Menu
          id="menu-appbar"
          anchorEl={anchorElUser}
          keepMounted
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {group.owner?.idPerson === idPerson ?
            <>
              <MenuItem key={1} onClick={handleClickOpenDialogInviteGroup}>
                <PersonAddIcon sx={{mr: 1}}/> <Typography textAlign="center">Adicionar membros</Typography>
              </MenuItem>

              <MenuItem key={2} onClick={handleCanEdit}>
                <ModeEdit sx={{mr: 1}}/> <Typography textAlign="center">Editar</Typography>
              </MenuItem>

              <MenuItem key={3} onClick={handleClickOpenDialogDeleteGroup}>
                <DeleteIcon sx={{mr: 1}}/> <Typography textAlign="center">Deletar</Typography>
              </MenuItem>
            </>
            :
            <>
              <MenuItem key={4} onClick={handleClickOpenDialogExitGroup}>
                <GroupRemoveIcon sx={{mr: 1}}/> <Typography textAlign="center">Sair</Typography>
              </MenuItem>
            </>
          }

        </Menu>



        <ListItem secondaryAction sx={{justifyContent: 'flex-end' }}>

          {
            edit ?
              <>
                <Tooltip title="Confirmar" >
                  <IconButton
                    edge="end"
                    aria-label="confirmGroup"
                    disabled={groupName!.length <= 0 || groupName!.length > 15}
                    onClick={handleEdit}
                  >
                    <CheckCircle />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Cancelar" sx={{ mr: 1 }}>
                  <IconButton
                    edge="end"
                    aria-label="cancelGroup"
                    onClick={handleCancelEdit}
                  >
                    <ClearIcon />
                  </IconButton>
                </Tooltip>
              </>
              :
              <Tooltip title="Opções"
          aria-controls={anchorElUser ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={anchorElUser ? 'true' : undefined}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <MoreHorizIcon />
            </IconButton>
          </Tooltip>
          }
          
        </ListItem>
{/* 

        <ListItem >
          <Tooltip title="Opções">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <MoreHorizIcon />
            </IconButton>
          </Tooltip>
          {group.owner?.idPerson === idPerson ?
            <>
              <Tooltip title="Adicionar membros" sx={{ mr: 1 }}>
                <IconButton
                  edge="end"
                  aria-label="addMember"
                  onClick={handleClickOpenDialogInviteGroup}
                >
                  <PersonAddIcon />
                </IconButton>
              </Tooltip>
              {
                !edit ?
                  <Tooltip title="Editar" sx={{ mr: 1 }}>
                    <IconButton
                      edge="end"
                      aria-label="editGroup"
                      onClick={() => setEdit(true)}
                    >
                      <ModeEdit />
                    </IconButton>
                  </Tooltip>
                  :
                  <>
                    <Tooltip title="Confirmar" >
                      <IconButton
                        edge="end"
                        aria-label="confirmGroup"
                        disabled={groupName!.length <= 0 || groupName!.length > 15}
                        onClick={handleEdit}
                      >
                        <CheckCircle />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Cancelar" sx={{ mr: 1 }}>
                      <IconButton
                        edge="end"
                        aria-label="cancelGroup"
                        onClick={() => setEdit(false)}
                      >
                        <ClearIcon />
                      </IconButton>
                    </Tooltip>
                  </>
              }
              <Tooltip title="Deletar Grupo" >
                <IconButton
                  edge="end"
                  aria-label="deleteGroup"
                  onClick={handleClickOpenDialogDeleteGroup}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </>
            :
            <Tooltip title="Sair do Grupo">
              <IconButton
                edge="end"
                aria-label="exitGroup"
                onClick={handleClickOpenDialogExitGroup}>
                <GroupRemoveIcon />
              </IconButton>
            </Tooltip>}
        </ListItem> */}


      </MuiAccordionSummary >
      <AccordionDetails>
        <Typography component={'span'}>
          Membros do grupo:
          <List>
            {
              members?.map((member, indexGroup) => (
                <GroupMemberListItem member={member} key={member.idPerson} idPerson={idPerson} idOwner={group.owner?.idPerson} idGroup={group.idGroup} onDeleteMember={handleRemoveMember} />
              ))
            }
          </List>
        </Typography>
      </AccordionDetails>

      <Dialog open={openDialogDeleteGroup} onClose={handleCloseDialogDeleteGroup}>
        <DialogTitle>Deletar grupo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja deletar o grupo:
            "<strong>{group.name}</strong>"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogDeleteGroup}>Cancelar</Button>
          <Button onClick={() => handleConfirmDialogDeleteGroup(group.idGroup, idPerson)}>Sim</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDialogExitGroup} onClose={handleCloseDialogExitGroup}>
        <DialogTitle>Sair do grupo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja sair do grupo:
            "<strong>{group.name}</strong>"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogExitGroup}>Cancelar</Button>
          <Button onClick={() => handleConfirmDialogExitGroup(group.idGroup, idPerson)}>Sim</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDialogInviteGroup} onClose={handleCloseDialogInviteGroup} fullWidth>
        <DialogTitle>Convide pessoas para o <strong>{group.name}</strong></DialogTitle>
        <DialogContent>
          <DialogContentText>
            Envie um link de convite para que outras pessoas possam entrar no seu grupo. Os membros do grupo são notitificados mensalmente e no dia do aniversário.
          </DialogContentText>
          <Box display='table' sx={{ width: '100%' }}>
            <FormControl fullWidth sx={{ mt: 2 }} variant="filled">
              <InputLabel htmlFor="filled-adornment-amount">Seu link de convite para o grupo {group.name}</InputLabel>
              <FilledInput
                id="filled-adornment-amount"
                autoFocus
                fullWidth
                value={inviteLink}
                endAdornment={
                  <>
                    <CopyToClipboard TooltipProps={{ title: "Copiado", leaveDelay: 3000 }}>
                      {({ copy }) => (
                        <IconButton
                          color="primary"
                          onClick={() => copy(inviteLink)}
                        >
                          <ContentCopyIcon />
                        </IconButton>

                      )}
                    </CopyToClipboard>
                    <Tooltip title="Recriar link do convite" >
                      <IconButton
                        edge="end"
                        color="primary"
                        aria-label="renovateInviteLink"
                        onClick={handleClickOpenDialogDeleteGroup}
                      >
                        <CachedIcon />
                      </IconButton>
                    </Tooltip>
                  </>
                }
              />
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogInviteGroup}>Fechar</Button>
        </DialogActions>
      </Dialog>

    </MuiAccordion >
  )
}