import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useState, useContext } from 'react';
import { TextareaAutosize } from '@mui/material';
import { AuthContext } from '../../../components/context/AuthContext';
import { useNotification } from '../../../components/notification/NotificationProvider';

export default function PenaltyResponse({handleDelete, penaltyRequestData}) {

  const { user } = useContext(AuthContext);

  const [open, setOpen] = useState(false);

  const [response, setResponse] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handeChangeResponse = (e) =>
  {
    setResponse(e.target.value)
  }

  const handleAccept = (e) => {
    e.preventDefault();
    
    const data = {
        id: penaltyRequestData.id,
        clientId: penaltyRequestData.clientId,
        clientEmail: penaltyRequestData.clientEmail,
        clientName: penaltyRequestData.clientName,
        clientLastName: penaltyRequestData.clientLastName,
        providerId: penaltyRequestData.providerId,
        providerEmail: penaltyRequestData.providerEmail,
        img: penaltyRequestData.img,
        offerName: penaltyRequestData.offerName,
        comment: penaltyRequestData.comment
      }

    fetch(`http://localhost:8080/api/penalty-req-response?accepted=true`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.accessToken}`,},
        body: JSON.stringify(data)
      })

      handleDelete(penaltyRequestData.id);
      handleClose();
     }


    const handleReject = (e) =>
    {
      e.preventDefault();
    
    const data = {
        id: penaltyRequestData.id,
        clientId: penaltyRequestData.clientId,
        clientEmail: penaltyRequestData.clientEmail,
        clientName: penaltyRequestData.clientName,
        clientLastName: penaltyRequestData.clientLastName,
        providerId: penaltyRequestData.providerId,
        providerEmail: penaltyRequestData.providerEmail,
        img: penaltyRequestData.img,
        offerName: penaltyRequestData.offerName,
        comment: penaltyRequestData.comment
      }

    fetch(`http://localhost:8080/api/penalty-req-response?accepted=false`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.accessToken}`,},
        body: JSON.stringify(data)
      })

      handleDelete(penaltyRequestData.id);
      handleClose();
    }

  return (
    <div>
      <div className="cellAction">
        <div className="editButton" onClick={handleClickOpen}>
                  View A Comment
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent style={{height:'400px', width:'400px'}}>
          <h2>Provider's 1 Penalty request for <i>{penaltyRequestData.clientEmail}</i></h2>
          <br></br>
          <h4>Provider's Comment</h4>
          <TextareaAutosize
            style={{height:'70%', width:'100%'}}
            autoFocus
            minRows={5}
            margin="dense"
            id="name"
            label="Text"
            type="text"
            fullWidth
            variant="standard"
            value={penaltyRequestData.comment}
            onChange={handeChangeResponse}
          />
        </DialogContent>
        <DialogActions>
          <Button style={{color: 'black'}} onClick={handleClose}>Cancel</Button>
          <Button style={{color: 'green'}} onClick={handleAccept}>Accept Request</Button>
          <Button style={{color: 'red'}} onClick={handleReject}>Reject Request</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}