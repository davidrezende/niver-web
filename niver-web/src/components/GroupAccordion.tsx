import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import React, { useCallback, useEffect, useState } from 'react';
import { IconButton, styled, ListItem, Tooltip, AccordionDetails, TextField, List } from '@mui/material';
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
  const [members, setMembers] = useState(group.members)


  const handleRemoveMember = async (idPerson: number, idGroup: number, ) => {
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
        <ListItem >
          {
            !edit ?
              <Typography sx={{ margin: 0.5, display: 'flex', fontWeight: 'lighter', alignItems: 'center' }}
                onClick={() => setOpenAccordion(!openAccordion)}>
                {group.owner?.idPerson === idPerson ? <ManageAccountsIcon /> : <Group />} {group.name}
              </Typography>
              :
              <TextField id="standard-basic" variant="standard" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
          }
        </ListItem>
        <ListItem secondaryAction=
          {group.owner?.idPerson === idPerson ?
            <>
              {
                !edit ?
                  <Tooltip title="Editar">
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
                    <Tooltip title="Confirmar">
                      <IconButton
                        edge="end"
                        aria-label="confirmGroup"
                        onClick={handleEdit}
                      >
                        <CheckCircle />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Cancelar">
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
              <Tooltip title="Deletar Grupo">
                <IconButton
                  edge="end"
                  aria-label="deleteGroup"
                  onClick={() => onDelete(group.idGroup, idPerson)}
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
              onClick={() => onDelete(group.idGroup, idPerson)}>
                <GroupRemoveIcon />
              </IconButton>
            </Tooltip>}>
        </ListItem>
      </MuiAccordionSummary >
      <AccordionDetails>
        <Typography>
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
    </MuiAccordion >
  )
}