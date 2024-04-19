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


const DeleteRequests = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [list, setList] = useState();
  const {user} = useContext(AuthContext);

  const { data, loading, error } = useFetch(`http://localhost:8080/api/user/deletion-requests?active=true`);

  const navigate = useNavigate();

  const columns = columnsData[user.type];

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleAccept = async (id) => {
    fetch(`http://localhost:8080/api/user/accept-deletion/${id}`, {
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

    fetch(`http://localhost:8080/api/user/reject-deletion/${id}`, {
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
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <FormDialog userId={params.row.id} handleAccept={handleAccept} handleReject={handleReject} requestType="deletionRequest"/>
          </div>
        );
      },
    },
  ];

  const requestTextColumn = [
    {
      field: "requestText",
      headerName: "Request Text",
      width: 550,
    }
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Deletion requests
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.slice(0, 6).concat(requestTextColumn).concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row.id}
      />
    </div>
  );
};

export default DeleteRequests