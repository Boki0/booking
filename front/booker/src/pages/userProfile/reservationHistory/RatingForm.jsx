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
import "./circularBarRating.scss"
import useFetch from '../../../hooks/useFetch';
import { useEffect } from 'react';
import { useNotification } from '../../../components/notification/NotificationProvider';

export default function RatingForm({reservationId, hasClientRated}) {

  const { user } = useContext(AuthContext);

  const [open, setOpen] = useState(false);

  const [rating, setRating] = useState(0);

  const [comment, setComment] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeComment = (e) =>
  {
    setComment(e.target.value)
  }

  const handleChangeRating = (e) =>
  {
    if(e.target.value > 0 || e.target.value < 85)
    {
      setRating(e.target.value)
    }
  }

  const dispatch = useNotification();

  const handleSubmit = (e) => {
    const data = {
        reservationId: reservationId,
        ratingOfUser: rating,
        commentOfUser: comment
    }

    if (![...Array(11).keys()].includes(parseInt(rating)))
    {
      sendNotification("error", "The value must be between 0 and 10")
    }

    else{
      e.preventDefault()
      fetch(`http://localhost:8080/auth/create-rating-request/${user.id}`, {
        method: 'POST',
        headers: 
      {'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
      })
      .then(data => {
        sendNotification("success", "You successfully rated provider and offer!");
      })
      handleClose();
    }
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
        <div className="newActionButton" onClick={handleClickOpen} disabled={hasClientRated}>
                  Rate
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent style={{height:'550px', width:'400px'}}>
        <div className="circularBarRatingWrapper">
          <div className="bottomCircularBarRating">
            <div className="circularBarRatingItem">
              <CircularProgressbar value={rating*10} text={rating} strokeWidth={5} />
            </div>
            <p className="titleCircularBarRating">Offer Rate</p>
             <input id='numberInput' className='ratingInput' type="number"
             min="0" 
             max="10"
             value={rating}
             onChange={handleChangeRating}
             defaultValue={rating}
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
            value={comment}
            onChange={handleChangeComment}
          />
          </div>
        </div>
        </DialogContent>
        <DialogActions>
          <Button style={{color: '#8B0000'}} onClick={handleClose}>Cancel</Button>
          <Button style={{color: '#0071c2'}} onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}