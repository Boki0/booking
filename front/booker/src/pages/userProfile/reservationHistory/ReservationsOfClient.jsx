import React from 'react'
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import useFetch from "../../../hooks/useFetch";
import { DataGrid } from "@mui/x-data-grid";
import "../../../dashboard/components/datatable/datatable.scss"
import { AuthContext } from "../../../components/context/AuthContext";
import { reservationColumnsForClient } from '../../../dashboard/resColumns';
import FillReport from '../../../dashboard/components/fillReport/FillReport';
import axios from "axios";
import {useNotification} from '../../../components/notification/NotificationProvider';
import NotificationProvider from '../../../components/notification/NotificationProvider';
import ComplaintForm from '../../complaints/ComplaintForm';
import RatingForm from './RatingForm';

const ReservationsOfClient = ({history,typeOfRes}) => {// tip rezervacije brod,vikendica,cas
  const navigate = useNavigate();
  const location = useLocation();
  
  const path = location.pathname.split("/")[2];
  const [list, setList] = useState();
	const { user } = useContext(AuthContext);
 
  const link = history ? `http://localhost:8080/api/reservations-of-user/history/${user.id}/${typeOfRes}` : `http://localhost:8080/api/reservations-of-user/future/${user.id}/0`

  const { data, loading, error } = useFetch(link);
 

  
  useEffect(() => {
    setList(data);
  }, [data]);

  const columns = reservationColumnsForClient;

  const dispatch = useNotification();


  // const [showReportModal, setShowReportModal] = useState(false);
  // const [showUsersInfoModal, setShowUsersInfoModal] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState();

  const [selectedItem, setSelectedItem] = useState();

  // const handleOnCellClick = (params) => {
  //   if (params.field !== 'client'){
  //     return;
  //   }
  //   console.log(params.id);
  //   setSelectedReservationId(params.id);
  //   setShowUsersInfoModal(!showUsersInfoModal);
  // };
 





 

 


    
  const cancel = async (id) => {
    
      try{
        const values=({
          res_id:id,
          client_id:user.id,
          });
  
 
  
        await axios.post('http://localhost:8080/api/cancel-res', values, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.accessToken}`,
          }
        });
        sendNotification("success", 'Successfully canceled reservation!');
  
      } catch(error){
        sendNotification("error", 'Cancellation is possible 3 days before the start!');
      }
   

  }


  const sendNotification = (type, message) => {
    dispatch({
      type: type,
      message: message,
      navigateTo: '/dashboard/cottage-reservation-history'
    });
  }


  const findReservationDataById = (id) =>
  {
    for (let i of list)
    {
      if (i.id === id)
        return i; 
    }
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 280,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div 
              //onClick={()=> newReportClick(params.row.id)}
              disabled = {history === false || params.row.status === "now"}
            >
              <NotificationProvider>
                <ComplaintForm reservationId={params.row.id}/>
              </NotificationProvider>
            </div>
            <div>
              <NotificationProvider>
                 <RatingForm reservationId={params.row.id} hasClientRated={findReservationDataById(params.row.id).hasClientRated}/>
              </NotificationProvider>
            </div>
            {!history &&<div 
              onClick={()=> cancel(params.row.id)}
              className="viewButton"
              
            >Cancel
            </div>}
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        <h1>Reservations</h1>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={8}
        rowsPerPageOptions={[8]}
        getRowId={(row) => row.id}
        // onCellClick={handleOnCellClick}
      />

 

      {/* {showReportModal && <><NotificationProvider>
        <FillReport
          reservationId={selectedItem} 
          showReportModal={showReportModal}
          setShowReportModal={setShowReportModal}
      /></NotificationProvider></>} */}

    
    </div>
  );
}

export default ReservationsOfClient