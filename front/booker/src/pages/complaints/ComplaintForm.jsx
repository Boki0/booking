import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useState, useContext } from 'react';
import { TextareaAutosize } from '@mui/material';
import { AuthContext } from '../../components/context/AuthContext';
import { useNotification } from '../../components/notification/NotificationProvider';

export default function ComplaintForm({reservationId}) {

  const { user } = useContext(AuthContext);

  const [offerComplaint, setOfferComplaint] = useState('');

  const [providerComplaint, setProvidetComplaint] = useState('');

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChangeOfferComplaint = (e) => {
    setOfferComplaint(e.target.value)
  }

  const onChangeProviderComplaint = (e) => {
    setProvidetComplaint(e.target.value)
  }

  const dispatch = useNotification();

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);

    const data = {
        userId: user.id,
        reservationId: reservationId,
        offerComplaint: offerComplaint,
        providerComplaint: providerComplaint
      }

    fetch(`http://localhost:8080/auth/file-complaint/${user.id}?offerComplaint=${offerComplaint}&providerComplaint=${providerComplaint}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
      .then(res => {
        if (!res.ok){
          if (res.status == 409){
            console.log('email exists error');
            throw Error('E-mail already exists!');
          }
          console.log('unknown error')
          throw Error('Unknown fetch error occurred!')
        } 
        return res.json()
      })
      .then(data => {
        sendNotification("success", "You successfuly filed a complaint");
      })
      .catch(err => {
        sendNotification("error", err.message)
      })
  }

  const sendNotification = (type, message) => {
    dispatch({
      type: type,
      message: message,
      navigateTo: '/dashboard'
    });
  }

  return (
    <div>
      <div className="cellAction">
        <div className="editButton" onClick={handleClickOpen}>
                  File A Complaint
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent style={{height:'400px', width:'400px'}}>
           <h4>Complaint For Offer</h4>
          <TextareaAutosize
            style={{height:'40%', width:'100%'}}
            autoFocus
            minRows={5}
            margin="dense"
            id="name"
            label="Text"
            type="text"
            fullWidth
            variant="standard"
            value={offerComplaint}
            onChange={onChangeOfferComplaint}
          />
          <h4>Complaint For Provider</h4>
          <TextareaAutosize
            style={{height:'40%', width:'100%'}}
            autoFocus
            minRows={5}
            margin="dense"
            id="name"
            label="Text"
            type="text"
            fullWidth
            variant="standard"
            value={providerComplaint}
            onChange={onChangeProviderComplaint}
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