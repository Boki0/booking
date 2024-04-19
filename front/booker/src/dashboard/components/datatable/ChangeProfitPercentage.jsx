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
import "./circularBar.scss"
import useFetch from '../../../hooks/useFetch';
import { useEffect } from 'react';
import { useNotification } from '../../../components/notification/NotificationProvider';

export default function ChangeProfitPercentage() {
  
  const { user } = useContext(AuthContext);

  const [open, setOpen] = useState(false);

  const [profitPercentage, setProfitPercentage] = useState();

  const { data, loading, error } = useFetch(`http://localhost:8080/api/get-profit-percentage`);

  useEffect(() => {
    setProfitPercentage(data);
  }, [data]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeProfitPercentage = (e) =>
  {
    if(e.target.value > 0 || e.target.value < 85)
    {
      setProfitPercentage(e.target.value)
    }
  }

  const dispatch = useNotification();

  const handleSubmit = (e) => {

    if (![...Array(86).keys()].includes(parseInt(profitPercentage)))
    {
      sendNotification("error", "The value must be between 0 and 85")
    }
    else{
      e.preventDefault()
      fetch(`http://localhost:8080/api/change-profit-percentage?profitPercentageValue=${parseFloat(profitPercentage)/100}`, {
        method: 'POST',
        headers: 
      {'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.accessToken}`,
      },
      })
      .then(data => {
        sendNotification("success", "You successfully updated profit percentage!");
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
        <div className="changeIncomePercentageButton" onClick={handleClickOpen}>
                  Change Income Percentage
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent style={{height:'400px', width:'400px'}}>
        <div className="circularBarWrapper">
          <div className="bottomCircularBar">
            <div className="circularBarItem">
              <CircularProgressbar value={profitPercentage} text={profitPercentage + '%'} strokeWidth={5} />
            </div>
            <p className="titleCircularBar">Profit Percentage</p>
             <input id='numberInput' className='changeProfitInput' type="number"
             min="0" 
             max="85"
             value={profitPercentage}
             onChange={handleChangeProfitPercentage}
             defaultValue={profitPercentage}
              />
          </div>
        </div>
        </DialogContent>
        <DialogActions>
          <Button style={{color: '#8B0000'}} onClick={handleClose}>Cancel</Button>
          <Button style={{color: '#0071c2'}} onClick={handleSubmit}>Submit Change</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}