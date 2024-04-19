import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useState, useContext } from 'react';
import { TextareaAutosize } from '@mui/material';
import { AuthContext } from '../../../components/context/AuthContext';
import { useNotification } from '../../../components/notification/NotificationProvider';

export default function ComplaintResponse({handleDelete, complaintData}) {
  console.log(complaintData)
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const data = {
        complaintId: complaintData.id,
        clientEmail: complaintData.clientEmail,
        providerEmail: complaintData.providerEmail,
        offerName: complaintData.offerName,
        offerComplaint: complaintData.offerComplaint,
        providerComplaint: complaintData.providerComplaint,
        adminResponse: response
      }

    fetch(`http://localhost:8080/api/send-email-complaint`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.accessToken}`,},
        body: JSON.stringify(data)
      })

      handleDelete(complaintData.id);
      handleClose();
     }

  return (
    <div>
      <div className="cellAction">
        <div className="editButton" onClick={handleClickOpen}>
                  View A Complaint
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent style={{height:'400px', width:'400px'}}>
           <h4>Complaint For Offer</h4>
          <TextareaAutosize
            style={{height:'23%', width:'100%'}}
            autoFocus
            minRows={5}
            margin="dense"
            id="name"
            label="Text"
            type="text"
            fullWidth
            variant="standard"
            value={complaintData.offerComplaint}
          />
          <h4>Complaint For Provider</h4>
          <TextareaAutosize
            style={{height:'23%', width:'100%'}}
            autoFocus
            minRows={5}
            margin="dense"
            id="name"
            label="Text"
            type="text"
            fullWidth
            variant="standard"
            value={complaintData.providerComplaint}
          />
          <h4>Your Response</h4>
          <TextareaAutosize
            style={{height:'23%', width:'100%'}}
            autoFocus
            minRows={5}
            margin="dense"
            id="name"
            label="Text"
            type="text"
            fullWidth
            variant="standard"
            value={response}
            onChange={handeChangeResponse}
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