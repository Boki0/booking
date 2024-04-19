import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { DataGrid } from "@mui/x-data-grid";
import "./SubList.scss"
import { columnsData } from "../../dashboard/datatablesource";
import { AuthContext } from "../../components/context/AuthContext";

import { useNotification } from "../../components/notification/NotificationProvider";

const SubList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [list, setList] = useState();
const { user } = useContext(AuthContext);
 
  
  const dispatch = useNotification();

  const [showAddActionModal, setShowAddActionModal] = useState(false);
  const [action, setAction] = useState({})

  const { data, loading, error ,reFetch} = useFetch(`http://localhost:8080/api/sub-list`);

  const columns = columnsData[user.type];

  const [selectedItem, setSelectedItem] = useState();

  useEffect(() => {
    setList(data);
  }, [data]);
 

  const handleSubmit = (id) => {
    const values=({
      client_id:user.id,
      offer_id:id,
      });


    
    fetch('http://localhost:8080/api/sub-list-del', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.accessToken}`,
          },
        body: JSON.stringify(values)
      })
       
        .then(data => {
          sendNotification("success", "You successfully");
        })
        .catch(err => {
          sendNotification("error", err.message)
        })
    
    
    }


const sendNotification = (type, message) => {
    dispatch({
      type: type,
      message: message,
      navigateTo: '/dashboard/cottage-reservation-history'
    });
  }

  const newActionClick = (id) => {
    setSelectedItem(id);
    setShowAddActionModal(!showAddActionModal);
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
              className="deleteButton"
              onClick={() => handleSubmit(params.row.id)}
            >
              Unsubscribe
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        getRowId={(row) => row.id}
      />

   
    </div>
  );
};

export default SubList