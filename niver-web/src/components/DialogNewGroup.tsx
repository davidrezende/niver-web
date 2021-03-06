import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

type ListProps = {
  openDialogNewGroup: boolean,
  handleCloseDialogNewGroup(): void,
  handleRegisterNewGroup(nameGroup: string): void,
};

export const DialogNewGroup: React.FC<ListProps> = ({ openDialogNewGroup, handleCloseDialogNewGroup, handleRegisterNewGroup }) => {

  const [nameGroup, setNameGroup] = useState('');
  const handlePrepareRegisterNewGroup = (nameGroup: string) => {
    handleRegisterNewGroup(nameGroup)
    setNameGroup('')
  }
  return (
    <Dialog open={openDialogNewGroup} onClose={handleCloseDialogNewGroup}>
      <DialogTitle>Novo Grupo</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Crie um grupo com seus amigos para ser lembrado quando o aniversário de algum deles estiver próximo.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="nameGroup"
          type="input"
          label="Nome do grupo"
          value={nameGroup}
          fullWidth
          inputProps={{ maxLength: 30 }}
          error={nameGroup.trim().length <= 0 || nameGroup.trim().length > 30}
          helperText={nameGroup.trim().length <= 0 || nameGroup.trim().length > 30 ? "Nome do grupo precisa ter entre 1 a 30 caracteres" : ""}
          variant="standard"
          onChange={(e) => setNameGroup(e.target.value)}
        />
        <DialogContentText sx={{ fontSize: 12}}>
          *Nós enviamos um email para todos do grupo caso algum membro faça aniversário no mês, além de avisarmos no dia do aniversário.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialogNewGroup}>Cancelar</Button>
        <Button onClick={() => handlePrepareRegisterNewGroup(nameGroup)} disabled={nameGroup.trim().length <= 0 || nameGroup.trim().length > 30} >Confirmar</Button>
      </DialogActions>
    </Dialog>
  )
}