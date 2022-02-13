import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import IGroupData from '../../shared/types/Group';
import React, { useCallback, useState } from 'react';
import { ListMemberGroupCp } from './ListMembers';
import { IconButton, styled, ListItem, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import { useGroups, usePerson } from '../../hooks';

type ListProps = {
  groups: IGroupData[];
  onDelete: (idGroup: number) => void; 
  idPerson: number;
  selectedIndex: number;
  onClick: (index: number) => void;
};

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(0.5turn)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));


export const AccordionCp: React.FC<ListProps> = ({ groups, idPerson, onDelete }) => {


  return (
    <div>
      {groups.map((group, index) => (
        <Accordion >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <ListItem>
              <Typography sx={{ margin: 0.5, display: 'flex', fontWeight: 'lighter', alignItems: 'center' }}>
                {group.owner === idPerson ? <ManageAccountsIcon /> : null} {group.name}
              </Typography>
            </ListItem>
            <ListItem secondaryAction=
              {group.owner === idPerson ?
                <Tooltip title="Deletar Grupo">
                  <IconButton 
                    edge="end"
                    aria-label="deleteGroup"
                    onClick={() => onDelete(group.idGroup)}
                    >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip> :
                <Tooltip title="Sair do Grupo">
                  <IconButton edge="end" aria-label="exitGroup">
                    <GroupRemoveIcon />
                  </IconButton>
                </Tooltip>}>
            </ListItem>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Membros do grupo:
              <ListMemberGroupCp members={group.members} idPerson={idPerson} idOwner={group.owner} />
            </Typography>
          </AccordionDetails>
        </Accordion >
      ))}
    </div>
  )
}