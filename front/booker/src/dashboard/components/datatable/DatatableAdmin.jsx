import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { DataGrid } from "@mui/x-data-grid";
import "./datatable.scss"
import { columnsData } from "../../datatablesource";
import { AuthContext } from "../../../components/context/AuthContext";


const DatatableAdmin = ({userType, entityType}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [list, setList] = useState();
  const { user } = useContext(AuthContext);

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.accessToken}`,
  }
  
  const { data, loading, error } = useFetch(`http://localhost:8080/api/${entityType}`);
  
  const columns = columnsData[userType];

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/${path}/${id}`, {
        headers: headers
      });
      setList(list.filter((item) => item.id !== id));

    } catch (err) {

    }
  };

  const capitalize = (str) =>
  {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 280,
      renderCell: (params) => {
        return (
          <div className="cellAction">
          {(entityType==="cottages"||entityType ==="boats"|| entityType==="lessons") &&
           <div 
              onClick={()=>navigate(`/dashboard/${path}/${params.row.id}`)}
              className="viewButton"
            >View
            </div>}
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
              disabled={params.row.status === "reserved"}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {entityType === "service_providers" && "Service Providers"}
        {entityType === "lessons" && "Fishing Lessons"}
        {entityType !== "service_providers" && entityType !== "lessons" && 
        <>{capitalize(entityType)}
          {entityType === "administrators" && <Link to={`/register-admin`} className="link">
            Register New Administrator
          </Link>}
        </>}
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

export default DatatableAdmin