import { useState } from "react";
import "./NewActionModal.scss";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import Calendar from "../calendar/Calendar"
import NewActionDetails from "./NewActionDetails";
import { useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import NotificationProvider from "../../../components/notification/NotificationProvider";

const NewActionModal = ({offerId, showAddActionModal, setShowAddActionModal}) => {

  const [discounts, setDiscounts] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [unavailablePeriods, setUnavailablePeriods] = useState([]);


  const [loading, setLoading] = useState(true)
  const [offer, setOffer] = useState();

  const { data, load, error, reFetch} = useFetch(`http://localhost:8080/api/offer/${offerId}`);

  const calendarData = discounts.concat(reservations).concat(unavailablePeriods); 

  useEffect(() => {
    setOffer(data);
  }, [data]);

  useEffect(() => {
    try{
      if ('periodsOfOccupancy' in offer){
        setDiscounts(offer.periodsOfOccupancy.discounts);
        setReservations(offer.periodsOfOccupancy.reservations);
        setUnavailablePeriods(offer.periodsOfOccupancy.unavailablePeriods);
        setLoading(false);
      }
    }catch(err){} // catch prazan jer offer nece na pocetku biti objekat
  }, [offer])

  const handleSubmit = () => {
  }

  const onClose = () => {
    setShowAddActionModal(!showAddActionModal);
  }

  return (
    <>
    <Dialog fullWidth maxWidth="xl" className="dialog" open={showAddActionModal} onClose={onClose} onSubmit={handleSubmit}>
      <DialogTitle className="dialogTitle">Add new period of occupancy</DialogTitle>
      <hr/>
      <DialogContent className="dialogContent">
        {!loading && <><NotificationProvider><NewActionDetails 
          offer={offer} 
          discounts={discounts} 
          setDiscounts={setDiscounts} 
          unavailablePeriods={unavailablePeriods}
          setUnavailablePeriods={setUnavailablePeriods}
        /></NotificationProvider>

        <Calendar data={calendarData} />
        </>}
      </DialogContent>

    </Dialog>
    </>
  )
}

export default NewActionModal