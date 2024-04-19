import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import Calendar from "../../dashboard/components/calendar/Calendar"
import { useEffect } from "react";
 
import NotificationProvider from "../../components/notification/NotificationProvider";
import UserReservationDetails from "./UserReservationDetails";
import { useContext } from "react";
import { AuthContext } from "../../components/context/AuthContext";

const UserReservation = ({of, showNewResModal, setShowNewResModal}) => {

  const [discounts, setDiscounts] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [unavailablePeriods, setUnavailablePeriods] = useState([]);
     const [offer, setOffer] = useState();

  const [loading, setLoading] = useState(true)
 
  const { user } = useContext(AuthContext);
  

   //const { data, load, error, reFetch} = useFetch(`http://localhost:8080/auth/cottage/${offerId}`);

  const calendarData = discounts.concat(reservations).concat(unavailablePeriods); 

   
 
 
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

  useEffect(() => {
    setOffer(of);
  }, [of]);




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
        { !loading && <><NotificationProvider><UserReservationDetails 
          offerId={offer.id}
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

export default UserReservation