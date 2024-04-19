import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { DataGrid } from "@mui/x-data-grid";
import "./datatable.scss"
import { columnsData } from "../../datatablesource";
import { AuthContext } from "../../../components/context/AuthContext";
import NewActionModal from "../newActionModal/NewActionModal";


const Datatable = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [list, setList] = useState();
	const { user } = useContext(AuthContext);
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.accessToken}`,
  }

  const [showAddActionModal, setShowAddActionModal] = useState(false);
  const [action, setAction] = useState({})

  const { data, loading, error } = useFetch(`http://localhost:8080/api/${path}/${user.id}`);

  const columns = columnsData[user.type];

  const [selectedItem, setSelectedItem] = useState();

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
              onClick={()=>navigate(`/dashboard/${path}/${params.row.id}`)}
              className="viewButton"
            >View
            </div>
            <div 
              onClick={()=>navigate(`/dashboard/${path}/edit/${params.row.id}`)}
              className="editButton"
              disabled={params.row.status ==="reserved"}
            >Edit
            </div>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
              disabled={params.row.status === "reserved"}
            >
              Delete
            </div>
              <div className="newActionButton" onClick={()=>newActionClick(params.row.id)}>New Period</div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        <Link to={`/dashboard/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        getRowId={(row) => row.id}
      />

      {selectedItem && <NewActionModal
        offerId={selectedItem}
        showAddActionModal={showAddActionModal}
        setShowAddActionModal={setShowAddActionModal}
      />}
    </div>
  );
};

export default Datatable