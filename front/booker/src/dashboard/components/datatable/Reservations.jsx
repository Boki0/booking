import React from 'react'
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import useFetch from "../../../hooks/useFetch";
import { DataGrid } from "@mui/x-data-grid";
import "./datatable.scss"
import { AuthContext } from "../../../components/context/AuthContext";
import { reservationColumns } from '../../resColumns';
import ClientsInfosModal from '../clientsInfosModal/ClientsInfosModal';
import FillReport from '../fillReport/FillReport';
import NewReservationOwner from '../newResOwner/NewReservationOwner';
import NotificationProvider from '../../../components/notification/NotificationProvider';

const Reservations = ({history, reservations, title}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [list, setList] = useState();
	const { user } = useContext(AuthContext);
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.accessToken}`,
  }

  const link = history ? `http://localhost:8080/api/reservations/history/${user.id}` : `http://localhost:8080/api/reservations/future/${user.id}`

  const { data, loading, error } = useFetch(link);
  
  useEffect(() => {
    setList(data);
  }, [data]);

  const columns = reservationColumns;

  const [showNewResModal, setShowNewResModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showUsersInfoModal, setShowUsersInfoModal] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState();

  const [selectedItem, setSelectedItem] = useState();

  const handleOnCellClick = (params) => {
    if (params.field !== 'client'){
      return;
    }
    console.log(params.id);
    setSelectedReservationId(params.id);
    setShowUsersInfoModal(!showUsersInfoModal);
  };

  const newReservationClick = (id) => {
    setSelectedItem(id);
    setShowNewResModal(!showNewResModal);
  }

  const newReportClick = (id) => {
    setSelectedItem(id);
    setShowReportModal(!showReportModal);
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div 
              onClick={()=> newReportClick(params.row.id)}
              className="viewButton"
              disabled = {history === false || params.row.status === "now" || params.row.status === "not_passed" || params.row.hasOwnerRated}
            >Fill Report
            </div>
            <div 
              onClick={()=>newReservationClick(params.row.id)}
              className="newActionButton"
              disabled={params.row.status !== "now"}
            >New Reservation
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        <h1>{title ? title : 'Reservations'}</h1>
      </div>
      <DataGrid
        className="datagrid"
        rows={(reservations) ? reservations : list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        getRowId={(row) => row.id}
        onCellClick={handleOnCellClick}
      />

      {selectedReservationId &&
       <ClientsInfosModal 
          reservationId={selectedReservationId}
          showClientsInfosModal={showUsersInfoModal}
          setShowClientsInfosModal={setShowUsersInfoModal} 
      />}

      {showReportModal && <><NotificationProvider>
        <FillReport
          reservationId={selectedItem} 
          showReportModal={showReportModal}
          setShowReportModal={setShowReportModal}
      /></NotificationProvider></>}

      {showNewResModal && 
        <NewReservationOwner 
          reservationId={selectedItem}
          showNewResModal={showNewResModal}
          setShowNewResModal={setShowNewResModal}
      />} 
    </div>
  );
}

export default Reservations