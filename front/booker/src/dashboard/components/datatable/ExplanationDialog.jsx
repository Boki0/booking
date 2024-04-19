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
import { AuthContext } from '../../../components/context/AuthContext';

export default function FormDialog({userId, handleAccept, handleReject, requestType}) {

  const [response, setResponse] = useState(false);

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

  const submitRegistration = (e) =>
  {
    e.preventDefault();
    const data = {
      id: userId,
      accepted: response,
      explanation: explanation
    }

    fetch(`http://localhost:8080/api/send-email-registration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify(data)
      })
        .then(res => {
          if (!res.ok){
            if (res.status == 409){
              console.log('email exists error'); // ?
            }
            throw Error('could not fetch data')
          } 
          return res.json()
        })
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          console.log(err.message)
        })

    if (response === false)
    {
      setOpen(false);
      handleReject(userId);
    }

    else
    {
      handleAccept(userId);
    }

  }

  const submitDeletion = (e) =>
  {
    e.preventDefault();
    const data = {
      id: userId,
      accepted: response,
      requestText: explanation
    }
    console.log(response)
    fetch(`http://localhost:8080/api/send-email-deletion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify(data)
      })
        .then(res => {
          if (!res.ok){
            if (res.status == 409){
              console.log('email exists error'); // ?
            }
            throw Error('could not fetch data')
          } 
          return res.json()
        })
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          console.log(err.message)
        })
      
    setOpen(false);
    if (response === false)
    {
      handleReject(userId);
    }

    else
    {
      handleAccept(userId);
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(requestType)
    if (requestType === "registrationRequest")
    {
      submitRegistration(e);
    }

    else
    {
      submitDeletion(e);
    }
  }

  const handleRejectRegistration = () =>
  {
    handleClickOpen();
    setResponse(false);
  }

  const handleAcceptDeletion = () =>
  {
    handleClickOpen();
    setResponse(true);
  }

  const handleRejectDeletion = () =>
  {
    handleClickOpen();
    setResponse(false);
  }

  const handleAcceptRegistration = (e) => {
    e.preventDefault()

    const data = {
      id: userId,
      accepted: true,
      explanation: "",
    }

    fetch('http://localhost:8080/api/send-email-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify(data)
      })
        .then(res => {
          if (!res.ok){
            if (res.status == 409){
              console.log('email exists error');
            }
            throw Error('could not fetch data')
          } 
          return res.json()
        })
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          console.log(err.message)
        })
    handleAccept(userId);
  }

  return (
    <div>
      <div className="cellAction">
        {requestType === "registrationRequest" && <div className="acceptButton" onClick={handleAcceptRegistration}>
                  Accept
        </div>}
        {requestType === "deletionRequest" && <div className="acceptButton" onClick={handleAcceptDeletion}>
                  Accept
        </div>}
        {requestType === "registrationRequest" && <div className="rejectButton" onClick={ handleRejectRegistration}>
                  Reject
        </div>}
        {requestType === "deletionRequest" && <div className="rejectButton" onClick={handleRejectDeletion}>
                  Reject
        </div>}
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Explanation</DialogTitle>
        <DialogContent style={{height:'400px', width:'400px'}}>
          <TextareaAutosize
            style={{height:'85%', width:'98%'}}
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