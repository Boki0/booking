import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import useFetch from "../../../hooks/useFetch";
import { DataGrid } from "@mui/x-data-grid";
import "./datatable.scss"
import { columnsData } from "../../datatablesource";
import { AuthContext } from "../../../components/context/AuthContext";
import "./datatable.scss"
import axios from "axios";
import PenaltyResponse from "./PenaltyResponse";

const PenaltyRequests = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [list, setList] = useState();
  const {user} = useContext(AuthContext);

  const { data } = useFetch(`http://localhost:8080/api/penalty-requests`);
  
  const columns = columnsData[user.type+"/PENALTIES"];

  useEffect(() => {
    setList(data);
  }, [data]);
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.accessToken}`,
  }
  
  const handleDelete = async (id) => {
    try {
        await axios.delete(`http://localhost:8080/api/delete-penalty-req/${id}`, {
          headers: headers
        });
        setList(list.filter((item) => item.id !== id));
  
      } catch (err) {
  
      }
  };

  const findPenaltyRequestDataById = (id) =>
  {
    console.log("fdsaf")
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
      width: 200,
      renderCell: (params) => {
        return (
        <div className="cellAction">
             <PenaltyResponse
            handleDelete={handleDelete} penaltyRequestData={findPenaltyRequestDataById(params.row.id)} />
        </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Penalty Requests
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row.id}
      />
    </div>
    );
};

export default PenaltyRequests