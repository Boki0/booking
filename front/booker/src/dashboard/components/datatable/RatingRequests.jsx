import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import useFetch from "../../../hooks/useFetch";
import { DataGrid } from "@mui/x-data-grid";
import "./datatable.scss"
import { columnsData } from "../../datatablesource";
import { AuthContext } from "../../../components/context/AuthContext";
import "./datatable.scss"
import axios from "axios";
import RatingInfo from "./RatingInfo";

const RatingRequests = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [list, setList] = useState();
  const {user} = useContext(AuthContext);

  const { data } = useFetch(`http://localhost:8080/api/rating-requests`);
  console.log(data)
  const columns = columnsData[user.type+"/RATING_REQUESTS"];

  useEffect(() => {
    setList(data);
  }, [data]);
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.accessToken}`,
  }
  
  const handleDelete = async (id) => {
    try {
        await axios.delete(`http://localhost:8080/api/delete-rating-req/${id}`, {
          headers: headers
        });
        setList(list.filter((item) => item.id !== id));
  
      } catch (err) {
  
      }
  };

  const findRatingRequestDataById = (id) =>
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
             <RatingInfo ratingData={findRatingRequestDataById(params.row.id)} handleDelete={handleDelete} />
        </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Rating Requests
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

export default RatingRequests