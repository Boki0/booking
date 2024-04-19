import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import "./clientsInfosModal.scss";
import Rating from "../rating/Rating";
import MapComp from "../../../components/map/MapComp";

const ClientsInfosModal = ({reservationId, showClientsInfosModal, setShowClientsInfosModal}) => {

  const [client, setClient] = useState();

  const { data, loading, error, reFetch} = useFetch(`http://localhost:8080/api/reservation/client/${reservationId}`);

  useEffect(() => {
    setClient(data);
  }, [data]);

  const handleSubmit = () => {
  }

  const onClose = () => {
    setShowClientsInfosModal(!showClientsInfosModal);
  }

  return (
    <>
    <Dialog fullWidth maxWidth="lg" className="dialog" open={showClientsInfosModal} onClose={onClose} onSubmit={handleSubmit}>
      <DialogTitle className="dialogTitle">Client's Informations</DialogTitle>
      <hr/>
      <DialogContent className="dialogContent">
        {!loading && <>
        
        <div className="singleContainer">
          <div className="top">
            <div className="left">
              <h1 className="title">Information</h1>
              <div className="item">
                <img
                  src={client.img || "https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png"}
                  alt=""
                  className="itemImg"
                />
                <div className="details">
                  <h1 className="itemTitle">{client.firstName + ' ' + client.lastName}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Email: </span>
                    <span className="itemValue">{client.email}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Phone: </span>
                    <span className="itemValue">{client.phoneNumber}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Address: </span>
                    <span className="itemValue">{client.address.street + ', ' + client.address.city}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Country: </span>
                    <span className="itemValue">{client.address.country}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey penalty">Penalty points: </span>
                    <span className="itemValue penalty">{client.numOfPenalties}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="right">
              <h1 className="title">Address</h1>
              <MapComp location={client.address} />
            </div>
          </div>
          <div className="bottom">
            <div className="bottomLeft">
              <h1 className="title">Rating</h1>
              <Rating rating={client.rating} />
            </div>
            <div className="bottomRight">
              <h1 className="title">Loyalty Program</h1>
              <Rating rating={client.rating} />
            </div>
          </div>
        </div>
        </>}

      </DialogContent>

    </Dialog>
    </>
  )
}

export default ClientsInfosModal