import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import Calendar from "../calendar/Calendar"
import { useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import NotificationProvider from "../../../components/notification/NotificationProvider";
import NewReservationOwnerDetails from "./NewReservationOwnerDetails";

const NewReservationOwner = ({reservationId, showNewResModal, setShowNewResModal}) => {

  const [discounts, setDiscounts] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [unavailablePeriods, setUnavailablePeriods] = useState([]);

  const [loading, setLoading] = useState(true)
  const [offer, setOffer] = useState();

  const { data, load, error, reFetch} = useFetch(`http://localhost:8080/api/reservation/offer/${reservationId}`);

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
    setShowNewResModal(!showNewResModal);
  }

  return (
    <>
    <Dialog fullWidth maxWidth="xl" className="dialog" open={showNewResModal} onClose={onClose} onSubmit={handleSubmit}>
      <DialogTitle className="dialogTitle">New Reservation for Client</DialogTitle>
      <hr/>
      <DialogContent className="dialogContent">
        { !loading && <><NotificationProvider><NewReservationOwnerDetails 
          offerId={offer.id}
          reservationId={reservationId}
          reservations={reservations}
          setReservations={setReservations}
          additionalServices={offer.additionalServices}
          pricePerNight={offer.price}
          capacity={offer.capacity}
        /></NotificationProvider>

        <Calendar data={calendarData} />
        </>}
      </DialogContent>

    </Dialog>
    </>
  )
}

export default NewReservationOwner