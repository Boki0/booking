import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useContext } from 'react';
import { TextareaAutosize } from '@mui/material';
import { AuthContext } from '../../components/context/AuthContext';
import { useNotification } from '../../components/notification/NotificationProvider';

export default function DeleteUserDialog({userId, handleDelete, isProviderReserved, authOrApi}) {
  
  const { user } = useContext(AuthContext);
  
  const [explanation, setExplanation] = useState('');

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChange = (e) => {
    setExplanation(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      id: userId,
      explanation: explanation
    }
    setOpen(false);
    handleDelete(userId, explanation);
  }

  return (
    <div>
      <div className="cellAction">
        {!isProviderReserved && <div className="deleteButtonClient" onClick={() =>  handleClickOpen(userId)}>
                  Delete Account
        </div>}
        {authOrApi === "auth" && <div className="deleteButtonClient" onClick={() =>  handleClickOpen(userId)}>
                  Delete Account
        </div>}
        {isProviderReserved == true && <div className="rejectDeletion">
             Can't Delete Profile
        </div>}
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Explanation of deletion</DialogTitle>
        <DialogContent>
          <TextareaAutosize
            autoFocus
            minRows={5}
            margin="dense"
            id="name"
            label="Text"
            type="text"
            fullWidth
            variant="standard"
            value={explanation}
            onChange={onChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}