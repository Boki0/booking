import axios from 'axios';
import { DateBox, SelectBox } from 'devextreme-react'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../components/context/AuthContext';
import { useNotification } from '../../../components/notification/NotificationProvider';
import Dropdown from '../dropdownCheckboxes/Option';

const NewActionDetails = ({offer, discounts, setDiscounts, unavailablePeriods, setUnavailablePeriods}) => {

  const [startDate, setStartDate] = useState(Date.now());
  const [endDate, setEndDate] = useState(Date.now());
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [selectedAdditionalServices, setSelectedAdditionalServices] = useState([]);

  const [startDatePicked, setStartDatePicked] = useState(false);
  const [endDatePicked, setEndDatePicked] = useState(false);

  const { user } = useContext(AuthContext);
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.accessToken}`,
  }
  const dispatch = useNotification();

  let options = [];
  for(const service of offer.additionalServices){
    options.push({value:service.id, label:service.name + ' - $' + service.price, price: service.price})
  }

  const [buttonEnable, setButtonEnable] = useState(false);

  useEffect(()=>{
    setButtonEnable(startDatePicked && endDatePicked && type)

  }, [startDate, endDate, type])

  
  
  const addBtnClick = async (e) => {
    e.preventDefault();
    setButtonEnable(false);

    try{
      let newPeriod = null;
      if (type==='SALE - Fast Reservation'){
        newPeriod = {
          startDate: startDate,
          endDate: endDate,
          price: price,
          additionalServices: selectedAdditionalServices,
        }
        await axios.post(`http://localhost:8080/api/newDiscount/${offer.id}`, newPeriod, {
          headers: headers
        });
        newPeriod.typeId = 2;
        newPeriod.text = 'SALE - Fast Reservation';
        setDiscounts([...discounts, newPeriod]);
      }
      else{
        newPeriod = {
          startDate: startDate,
          endDate: endDate
        }
        await axios.post(`http://localhost:8080/api/unavailable-period/${offer.id}`, newPeriod, {
          headers: headers
        });
        newPeriod.typeId = 4;
        newPeriod.text = 'Unavailable Period';
        setUnavailablePeriods([...unavailablePeriods, newPeriod]);
      }

      sendNotification("success", 'Period is successfully added!');
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
              defaultValue={new Date()}
              type="date"
              min={Date.now()}
              onValueChanged={(e)=>{setStartDatePicked(true); setStartDate(e.value)}}
            />
          </div>
          <div className="inputs">
            <label>End Date</label>
            <DateBox 
              defaultValue={new Date()}
              type="date"
              min={startDate}
              onValueChanged={(e)=>{setEndDatePicked(true); setEndDate(e.value)}}
            />
          </div>
          {type === 'SALE - Fast Reservation' && <div className="inputs">
          <label>Additional Services</label>
          <Dropdown options={options} setSelected={setSelectedAdditionalServices} multiSelect={true}/>
        </div>}
        </div>
        <div className="inputsWrapper">
          <div className="inputs selectBox">
            <label>Type</label>
            <SelectBox 
              width={230}
              items={['SALE - Fast Reservation', 'Unavailable Period']}
              onValueChange={(e)=>{setType(e)}}
              />
          </div>
          {type==='SALE - Fast Reservation' && <div className="inputs">
            <label>Total Price [$]</label>
            <input className="input"
              name={"price"}
              type={"number"}
              placeholder={"Enter total price"}
              required={true}
              min={0}
              onChange={(e)=>{setPrice(e.target.value)}}
            />
          </div>}
          
        </div>

        <button className={"addBtn " + (!buttonEnable && " disabled")} disabled={!buttonEnable}>RESERVE</button>
      </div>
    </form>
  )
}

export default NewActionDetails