import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useEffect,useContext,useState } from "react";
import { AuthContext } from "../../components/context/AuthContext";
import useFetch from "../../hooks/useFetch";
import { DataGrid } from "@mui/x-data-grid";
import {quickReservationCol} from "../../dashboard/resColumns"
import "../../dashboard/components/datatable/datatable.scss"
import axios from "axios";
import {useNotification} from '../../components/notification/NotificationProvider';

 


 
const QuickBooking = ({of, showNewResModal, setShowNewResModal}) => {

    const [offer, setOffer] = useState();
    const [loading, setLoading] = useState(true)
    const { user } = useContext(AuthContext);
    const [list, setList] = useState();
    const dispatch = useNotification();

    useEffect(() => {
        setOffer(of);
    }, [of]);

    const columns = quickReservationCol;

    const { data, load, error, reFetch} = useFetch(`http://localhost:8080/api/discounts/${of.id}`);
   
    useEffect(() => {
        setList(data);
    }, [data]);

 

  const handleSubmit = () => {
    }

  const onClose = () => {
    setShowNewResModal(!showNewResModal);
  }


  const reserve = async (id) => {
    try{
      const values=({
        qres_id:id,
        client_id:user.id,
        offer_id:of.id

        });
      await axios.post('http://localhost:8080/api/quickbooking', values, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.accessToken}`,
        }
      });
      sendNotification("success", 'Successfully reserved!');

    } catch(error){
      sendNotification("error", 'Error!');
    }

}
const sendNotification = (type, message) => {
    dispatch({
    type: type,
    message: message,
    navigateTo: '/dashboard/cottage-reservation-history'
    });
}



  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div 
              onClick={()=> reserve(params.row.id)}
              className="newActionButton"
            >RESERVE 
            </div>
          </div>
        );
      },
    },
  ];





  return (
    <>
    <Dialog fullWidth maxWidth="xl" className="dialog" open={showNewResModal} onClose={onClose} onSubmit={handleSubmit}>
      <DialogTitle className="dialogTitle">Quick Booking</DialogTitle>
      <hr/>
      <DialogContent className="dialogContent">
      <div className="datatable">
      <div className="datatableTitle">
        <h1 >QuickBooking</h1>
      </div>
      <DataGrid
        width="800px"
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}   
        pageSize={8}
        rowsPerPageOptions={[8]}
        getRowId={(row) => row.id}
        // onCellClick={handleOnCellClick}
      />
      </div>
      </DialogContent>

    </Dialog>
    </>
  )
}

export default QuickBooking