import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../../components/context/AuthContext";
import { useNotification } from "../../../components/notification/NotificationProvider";
import Dropdown from "../dropdownCheckboxes/Option"
import "./fillReport.scss"

const FillReport = ({reservationId, showReportModal, setShowReportModal}) => {

  const { user } = useContext(AuthContext);
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.accessToken}`,
  }
  const dispatch = useNotification();

  const [comment, setComment] = useState();
  const [reportSelected, setReportSelected] = useState(-1);
  
  const handleSubmit = () => {
  }

  const onClose = () => {
    setShowReportModal(!showReportModal);
  }

  const onReportSelected = (e) => {
    if (e == null) setReportSelected(-1)
    else setReportSelected(e.value)
  } 

  const options = [
    {value: 0, label:'Bad client - send request for giving 1 penalty point to client'},
    {value: 1, label:'Client did not show up'}
  ]

  const addBtnClick = async (e) => {
    e.preventDefault();
    try{
      const newReport = {
        comment: comment,
        reportType: reportSelected
      }

      setComment('');

      await axios.post(`http://localhost:8080/api/reservation/svcProvReport/${reservationId}`, newReport, {
        headers: headers
      });
      sendNotification("success", 'Report is successfully sent!');

    } catch(error){
      sendNotification("error", 'Some error occured. Try again later!');
    }
  }

  const sendNotification = (type, message) => {
    dispatch({
      type: type,
      message: message,
      navigateTo: '/dashboard/my-offers'
    });
  }

  return (
    <>
    <Dialog fullWidth maxWidth="sm" className="dialog" open={showReportModal} onClose={onClose} onSubmit={handleSubmit}>
      <DialogTitle className="dialogTitle">Report for Client</DialogTitle>
      <hr/>
      <DialogContent className="dialogContent" style={{height:'600px'}}>
        <div className="inputs">
          <label>Comment</label>
          <textarea
            rows={15}
            cols={50}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <div className="inputs">
          <label>Bad client? Report them!</label>
          <Dropdown options={options} setSelected={onReportSelected} multiSelect={false}/>
        </div>

        <button className={"addBtn " + (!comment && " disabled")} disabled={!comment} onClick={addBtnClick}>SEND</button>

      </DialogContent>
    </Dialog>
    </>
  )
}

export default FillReport