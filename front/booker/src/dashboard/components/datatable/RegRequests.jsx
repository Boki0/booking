import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import useFetch from "../../../hooks/useFetch";
import { DataGrid } from "@mui/x-data-grid";
import "./datatable.scss"
import { columnsData } from "../../datatablesource";
import FormDialog from "../datatable/ExplanationDialog";
import { AuthContext } from "../../../components/context/AuthContext";


const RegRequests = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [list, setList] = useState();
  const {user} = useContext(AuthContext);

  const { data, loading, error } = useFetch(`http://localhost:8080/api/user/requests?enabled=false&user_type=${user.type}`);
  
  const columns = columnsData[user.type];

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleAccept = async (id) => {
    fetch(`http://localhost:8080/api/user/enable/${id}`, {
        //uspeo sam azurirati i bez method: PUT (sa tim sam imao problema pa sam ga pokusao izbeci)
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.accessToken}`,
        },
      })
      try {
        setList(list.filter((item) => item.id !== id));
      } catch (err) {}
  };

  const handleReject = async (id) => {

    fetch(`http://localhost:8080/api/user/reject-request/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.accessToken}`,
      },
      })
    try {
      setList(list.filter((item) => item.id !== id));
    } catch (err) {}
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 140,
      renderCell: (params) => {
        return (
          <FormDialog userId={params.row.id} handleAccept={handleAccept} handleReject={handleReject} requestType="registrationRequest"/>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Registration requests
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

export default RegRequests