import { useContext, useState } from "react";
import { AuthContext } from "../../components/context/AuthContext";
import { useNotification } from "../../components/notification/NotificationProvider";
 
import Dropdown from "../../dashboard/components/dropdownCheckboxes/Option"
import { DateBox } from 'devextreme-react'
import { useEffect } from "react";
import axios from "axios";
import { SearchContext } from "../../components/context/SearchContext";


const UserReservationDetails = ({offerId, reservations, setReservations, additionalServices, pricePerNight, capacity}) => {

  const [selectedAdditionalServices, setSelectedAdditionalServices] = useState([]);
  const { dates } = useContext(SearchContext);
  const [startDate, setStartDate] = useState(dates[0].startDate);
  const [endDate, setEndDate] = useState(dates[0].endDate);
  const [price, setPrice] = useState();
  const [numOfAttendants, setNumOfAttendants] = useState();
 
  const [startDatePicked, setStartDatePicked] = useState(true);
  const [endDatePicked, setEndDatePicked] = useState(true);

  const { user } = useContext(AuthContext);
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.accessToken}`,
  }
  const dispatch = useNotification();

  const [buttonEnable, setButtonEnable] = useState(false);


  let options = [];
  for(const service of additionalServices){
    options.push({value:service.id, label:service.name + ' - $' + service.price, price: service.price})
  }


  let attendantsOptions = []
  for(let i=1; i <= capacity; i++){
    attendantsOptions.push({value:i, label:i});
  }

  let nightsToStay = 1;

  useEffect(()=>{
    let priceCount = 0;

    setButtonEnable(startDatePicked && endDatePicked && numOfAttendants)

    if (startDatePicked && endDatePicked && endDate > startDate) {

      nightsToStay = (endDate - startDate) / (1000 * 3600 * 24);
      priceCount += nightsToStay * pricePerNight;

      for(const selectedService of selectedAdditionalServices){
        priceCount += selectedService.price;
      }
      setPrice('$' + priceCount);
    }
    else 
      setPrice('enter dates properly');

  }, [startDate, endDate, selectedAdditionalServices, numOfAttendants])

 console.log(price);
  
  const addBtnClick = async (e) => {
    e.preventDefault();
    setButtonEnable(false);

    try{

      if (!(price.substr(1,) > 0)) throw new Error();

      let newReservation = {
        startDate: startDate,
        endDate: endDate,
        price: price.substr(1,),
        numOfAttendants: numOfAttendants.value,
        additionalServices: selectedAdditionalServices,
      }
      await axios.post(`http://localhost:8080/api/newReservationUser/${user.id}/${offerId}`, newReservation, {
        headers: headers
      });
      newReservation.typeId = 3;
      newReservation.text = 'Reserved';
      setReservations([...reservations, newReservation]);

      sendNotification("success", 'Reservation is successfully added!');
    } catch(error){
      sendNotification("error", 'Entered period is unavailable!');
    }
  }

  const sendNotification = (type, message) => {
    dispatch({
      type: type,
      message: message,
      navigateTo: false
    });
  }

  return (
    <form onSubmit={addBtnClick}>
      <div className="formWrapper">
        <div className="inputsWrapper">
          <div className="inputs">
            <label>Start Date</label>
            <DateBox 
              defaultValue={dates[0].startDate || new Date()}
              type="date"
              min={Date.now()}
              
              onValueChanged={(e)=>{setStartDatePicked(true); setStartDate(e.value);}
            }
            />
          </div>
          <div className="inputs">
            <label>End Date</label>
            <DateBox 
              defaultValue={dates[0].endDate || new Date()}
              type="date"
              min={startDate}
              onValueChanged={(e)=>{setEndDatePicked(true); setEndDate(e.value);}}
            />
          </div>
        </div>
        <div className="inputsWrapper">
          <div className="inputs">
            <label>Additional Services</label>
            <Dropdown options={options} setSelected={setSelectedAdditionalServices} multiSelect={true}/>
          </div>
          <div className="inputs">
            <label>Number of Attendants</label>
            <Dropdown options={attendantsOptions} setSelected={setNumOfAttendants} multiSelect={false}/>
          </div>
        </div>
        <div className="inputsWrapper">
          <div className="inputs">
            <span>Total Price: {price}</span>
          </div>
        </div>
        <button className={"addBtn " + (!buttonEnable && " disabled")} disabled={!buttonEnable}>RESERVE</button>
      </div>
    </form>
  )
}

export default UserReservationDetails