import CachedIcon from '@mui/icons-material/Cached';
import CheckCircle from '@mui/icons-material/CheckCircle';
import ClearIcon from '@mui/icons-material/Clear';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Group from '@mui/icons-material/Group';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ModeEdit from '@mui/icons-material/ModeEdit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { AccordionDetails, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FilledInput, FormControl, IconButton, InputLabel, List, ListItem, Menu, MenuItem, TextField, Tooltip } from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { GroupService } from '../services/GroupService';
import { InviteService } from '../services/InviteService';
import IGroupData from '../shared/types/Group';
import CopyToClipboard from './CopyToClipboard';
import { GroupMemberListItem } from './GroupMemberListItem';

type ListProps = {
  group: IGroupData;
  onDelete: (idGroup: number, idPerson: number) => void;
  onEdit: (group: IGroupData) => void;
  idPerson: number;
};


export const GroupAccordion: React.FC<ListProps> = ({ group, idPerson, onDelete, onEdit }) => {
  const [edit, setEdit] = useState(false)
  const [openAccordion, setOpenAccordion] = useState(false)
  const [groupName, setGroupName] = useState(group.name)
  const [inviteLink, setInviteLink] = useState('')
  const [loadingInviteCreate, setLoadingInviteCreate] = useState(false)
  const [members, setMembers] = useState(group.members)
  const [openDialogDeleteGroup, setOpenDialogDeleteGroup] = React.useState(false);
  const [openDialogExitGroup, setOpenDialogExitGroup] = React.useState(false);
  const [openDialogInviteGroup, setOpenDialogInviteGroup] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
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
    if (group.owner?.idPerson === idPerson) {
      handleGetInviteGroup(group.idGroup, idPerson)
    }
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

  const handleGetInviteGroup = async (idGroup: number, idPerson: number) => {
    setLoadingInviteCreate(false)
    await delay(2000)
    await InviteService.getInviteExistsFromGroup(idGroup, idPerson)
      .then(({ status, data, config }) => {
        if (status === 200) {
          setInviteLink(data.inviteHash)
          setLoadingInviteCreate(true)
        }
      }).catch(async ex => {
        if (ex.response.status === 400) {
          console.log('nao achei convite para esse grupo, criando um')
          await InviteService.generateOrRecreateInvite({ idGroup: idGroup, owner: idPerson })
            .then((response) => {
              if (response.status === 200) {
                setInviteLink(response.data.inviteHash)
                setLoadingInviteCreate(true)
              } else {
                console.log('erro ao tentar criar convite')
              }
            }).catch((response) => {
              enqueueSnackbar('Desculpe! Não estamos conseguimos criar um convite para o seu grupo. Tente novamente mais tarde. 😢');
              console.log('erro desconhecido ao criar um convite para um grupo pela primeira vez')
            })
        } else {
          enqueueSnackbar('Desculpe! Estamos passando por problemas. Tente novamente mais tarde. 😢');
          console.log('erro desconhecido ao buscar um convite para o grupo')
        }
      })
  }

  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const handleGenerateInviteGroup = async (idGroup: number, idPerson: number) => {
    setLoadingInviteCreate(false)
    await delay(3000)
    await InviteService.generateOrRecreateInvite({ idGroup: idGroup, owner: idPerson })
      .then((response) => {
        if (response.status === 200) {
          setInviteLink(response.data.inviteHash)
          enqueueSnackbar('Tudo certo! Seu convite foi recriado 🥳');
          setLoadingInviteCreate(true)
        } else {
          console.log('erro ao tentar recriar convite')
        }
      }).catch((response) => {
        enqueueSnackbar('Desculpe! Estamos passando por problemas. Tente novamente mais tarde. 🙀');
        console.log('erro desconhecido ao tentar recriar um convite para um grupo')
      })
  }

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

    <MuiAccordion
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
              <Typography component="h2" variant="h6" sx={{ margin: 0.5, display: 'flex', fontWeight: 'lighter', alignItems: 'center', fontSize: '100%' }}
                onClick={() => setOpenAccordion(!openAccordion)}>
                {group.owner?.idPerson === idPerson ? <ManageAccountsIcon sx={{ mr: 1 }} /> : <Group />} {group.name}
              </Typography>
              :
              <TextField
                fullWidth
                id="standard-basic"
                inputProps={{ maxLength: 30 }}
                error={groupName!.trim().length <= 0 || groupName!.trim().length > 30}
                helperText={groupName!.trim().length <= 0 || groupName!.trim().length > 30 ? "Nome do grupo precisa ter entre 1 a 30 caracteres" : ""}
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
                <PersonAddIcon sx={{ mr: 1 }} /> <Typography textAlign="center">Adicionar membros</Typography>
              </MenuItem>

              <MenuItem key={2} onClick={handleCanEdit}>
                <ModeEdit sx={{ mr: 1 }} /> <Typography textAlign="center">Editar</Typography>
              </MenuItem>

              <MenuItem key={3} onClick={handleClickOpenDialogDeleteGroup}>
                <DeleteIcon sx={{ mr: 1 }} /> <Typography textAlign="center">Deletar</Typography>
              </MenuItem>
            </>
            :
            <>
              <MenuItem key={4} onClick={handleClickOpenDialogExitGroup}>
                <GroupRemoveIcon sx={{ mr: 1 }} /> <Typography textAlign="center">Sair</Typography>
              </MenuItem>
            </>
          }

        </Menu>



        <ListItem secondaryAction sx={{ justifyContent: 'flex-end' }}>

          {
            edit ?
              <>
                <Tooltip title="Confirmar" >
                  <IconButton
                    edge="end"
                    aria-label="confirmGroup"
                    disabled={groupName!.trim().length <= 0 || groupName!.trim().length > 15}
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

      </MuiAccordionSummary >
      <AccordionDetails>
        <Box sx={{ display: 'flex' }}>
          <Typography component={'span'} sx={{ ml: 4, mt: 4, fontSize: '100%', }}>
            <Typography component={'span'} sx={{ fontSize: '100%', }}><strong>Membros do grupo ({members?.length})</strong></Typography>
            <List>
              {
                members?.map((member, indexGroup) => (
                  <>
                    <GroupMemberListItem member={member} key={member.idPerson} idPerson={idPerson} idOwner={group.owner?.idPerson} idGroup={group.idGroup} onDeleteMember={handleRemoveMember} />
                  </>
                ))
              }
            </List>
          </Typography>
        </Box>
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
                disabled={!loadingInviteCreate}
                
                fullWidth
                value={loadingInviteCreate? window.location.href.toString() + '/invite/' + inviteLink : '🤖 Calma aí, tô pegando seu convite...'}
                endAdornment={
                  <>
                    <CopyToClipboard TooltipProps={{ title: "Copiado", leaveDelay: 3000 }}>
                      {({ copy }) => (
                        <IconButton
                          color="primary"
                          onClick={() => copy(window.location.href.toString() + '/invite/' + inviteLink)}
                        >
                          <ContentCopyIcon />
                        </IconButton>

                      )}
                    </CopyToClipboard>
                    <Tooltip title="Recriar link do convite" >
                      <IconButton
                        disabled={!loadingInviteCreate}
                        edge="end"
                        color="primary"
                        aria-label="renovateInviteLink"
                        onClick={() => handleGenerateInviteGroup(group.idGroup, idPerson)}
                      >
                        {loadingInviteCreate? <CachedIcon /> : <><CircularProgress size= '1rem' /></> }
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