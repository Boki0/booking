import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useState, useContext } from 'react';
import { TextareaAutosize } from '@mui/material';
import { AuthContext } from '../../../components/context/AuthContext';
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./circularBarRatingAdmin.scss"
import useFetch from '../../../hooks/useFetch';
import { useEffect } from 'react';
import { useNotification } from '../../../components/notification/NotificationProvider';

export default function RatingInfo({ratingData, handleDelete}) {
    
  const { user } = useContext(AuthContext);

  const [open, setOpen] = useState(false);

  const dataToSend = {
    offerId: ratingData.offerId,
    offerName: ratingData.offerName,
    providerEmail: ratingData.providerEmail,
    ratingValue: ratingData.ratingValue,
    comment: ratingData.commentOfUser,
    clientEmail: ratingData.clientEmail
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAccept = (e) => {
    e.preventDefault()
      fetch(`http://localhost:8080/api/rating-request-response/${true}`, {
        method: 'POST',
        headers: 
      {'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(dataToSend)
    })
    handleDelete(ratingData.id)
    handleClose()
  }

  const handleReject = (e) => {
    e.preventDefault()
      fetch(`http://localhost:8080/api/rating-request-response/${false}`, {
        method: 'POST',
        headers: 
      {'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(dataToSend)
    })
   
    handleDelete(ratingData.id)
    handleClose()
  }

  return (
    <div>
      <div className="cellAction">
        <div className="editButton" onClick={handleClickOpen}>
                  View Rating Info
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent style={{height:'550px', width:'400px'}}>
        <div className="circularBarRatingAdminWrapper">
          <div className="bottomCircularBarRatingAdmin">
            <div className="circularBarRatingAdminItem">
              <CircularProgressbar value={ratingData.ratingValue*10} text={ratingData.ratingValue} strokeWidth={5} />
            </div>
            <p className="titleCircularBarRatingAdmin">Offer Rate</p>
             <input id='numberInput' className='ratingAdminInput' type="number"
             min="0" 
             max="10"
             value={ratingData.ratingValue}
             defaultValue={ratingData.ratingValue}
              />
            <p className="titleCircularBarRating">Comment</p>
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
            value={ratingData.commentOfUser}
          />
          </div>
        </div>
        </DialogContent>
        <DialogActions>
        <Button style={{color: 'black'}} onClick= {handleClose}>Cancel</Button>
          <Button style={{color: '#8B0000'}} onClick={handleReject}>Reject</Button>
          <Button style={{color: 'green'}} onClick={handleAccept}>Accept</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}