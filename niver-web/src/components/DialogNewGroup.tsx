import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useMemo } from "react";


type ListProps = {
  nameGroup: string;
  openDialogNewGroup: boolean,
  handleCloseDialogNewGroup(): void,
  handleRegisterNewGroup(): void,
  setNameGroup(nameGroup: string): void
};



export const DialogNewGroup: React.FC<ListProps> = ({ nameGroup, openDialogNewGroup, handleCloseDialogNewGroup, handleRegisterNewGroup, setNameGroup }) => {
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
          inputProps={{ maxLength: 15 }}
          error={nameGroup.length <= 0 || nameGroup.length > 15}
          helperText={nameGroup.length <= 0 || nameGroup.length > 15 ? "Nome do grupo precisa ter entre 1 a 15 caracteres" : ""}
          variant="standard"
          onChange={(e) => setNameGroup(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialogNewGroup}>Cancelar</Button>
        <Button onClick={handleRegisterNewGroup} disabled={nameGroup.length <= 0 || nameGroup.length > 15} >Confirmar</Button>
      </DialogActions>
    </Dialog>
  )
}