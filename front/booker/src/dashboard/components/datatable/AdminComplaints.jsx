import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import useFetch from "../../../hooks/useFetch";
import { DataGrid } from "@mui/x-data-grid";
import "./datatable.scss"
import { columnsData } from "../../datatablesource";
import FormDialog from "../datatable/ExplanationDialog";
import { AuthContext } from "../../../components/context/AuthContext";
import { useNavigate } from "react-router";
import "./datatable.scss"
import ComplaintResponse from "./ComplaintResponse";
import axios from "axios";

const AdminComplaints = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [list, setList] = useState();
  const {user} = useContext(AuthContext);

  const { data } = useFetch(`http://localhost:8080/api/complaints`);
  
  const columns = columnsData[user.type+"/COMPLAINTS"];

  useEffect(() => {
    setList(data);
  }, [data]);

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.accessToken}`,
  }
  
  const handleDelete = async (id) => {
    try {
        await axios.delete(`http://localhost:8080/api/delete-complaint/${id}`, {
          headers: headers
        });
        setList(list.filter((item) => item.id !== id));
  
      } catch (err) {
  
      }
  };

  const findComplaintDataById = (id) =>
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
      width: 200,
      renderCell: (params) => {
        return (
           <div className="cellAction">
             <ComplaintResponse
             handleDelete={handleDelete} complaintData={findComplaintDataById(params.row.id)} />
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Complaints
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

export default AdminComplaints