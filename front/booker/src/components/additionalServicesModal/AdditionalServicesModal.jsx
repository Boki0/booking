import "./additionalServicesModal.scss"
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from "@mui/material"
import {v4 as uuidv4} from "uuid";
import AddServiceList from "./addServiceList/AddServiceList";
import FormInput from "../../components/formInput/FormInput"

const AdditionalServicesModal = ({services, setServices, deleteAddService, showAddServices, setShowAddServices}) => {

  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [servicePrice, setServicePrice] = useState("");

  // const [services, setServices] = useState(addServices);

  const errorMessage = "Invalid field";

  const handleSubmit = () => {

  }

  const addBtnClick = (e) => {
    e.preventDefault();
    setServices([...services, {id: uuidv4(), name: serviceName, description: serviceDescription, price: servicePrice}]);
  }

  return (
    <>
    <Dialog className="dialog" open={showAddServices} onClose={() => setShowAddServices(!showAddServices)} onSubmit={handleSubmit}>
      <DialogTitle className="dialogTitle">Add additional services</DialogTitle>
      <hr/>
      <DialogContent className="dialogContent">
        <form onSubmit={addBtnClick}>
          <div className="inputs">
            <FormInput
              type="text"
              placeholder="New service 1"
              value={serviceName}
              required
              onChange={(e)=>setServiceName(e.target.value)}
              label="Service name"
              errorMessage={errorMessage}
            />
          </div>

          <div className="inputs">
            <FormInput 
              label="Description"
              type="text"
              value={serviceDescription}
              required
              placeholder="Description of new additional service"
              onChange={(e)=>setServiceDescription(e.target.value)}
              errorMessage={errorMessage}
            />        
          </div>

          <div className="inputs">
            <FormInput 
              label="Price [$]"
              type="number"
              value={servicePrice}
              placeholder="10"
              required
              onChange={(e)=>setServicePrice(e.target.value)}
              errorMessage={errorMessage}
            />        
            <span className="errorSpan">{errorMessage}</span>
          </div>

          <button className="addBtn">ADD</button>
        </form>


        <AddServiceList services={services} setServices={setServices}/>

      </DialogContent>


    </Dialog>
    </>
  )
}

export default AdditionalServicesModal