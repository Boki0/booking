import "./newBoat.scss"
import { DriveFolderUploadOutlined } from '@mui/icons-material';
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { AuthContext } from "../../../../components/context/AuthContext";
import DashNavbar from '../../../components/navbar/DashNavbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import { boatInputs } from "../../../formSource";
import FormInput from '../../../../components/formInput/FormInput';
import FormTextArea from "../../../../components/formTextArea/FormTextArea";
import AdditionalServicesModal from "../../../../components/additionalServicesModal/AdditionalServicesModal";
import { useNotification } from "../../../../components/notification/NotificationProvider";
import { useLocation } from "react-router"
import { useEffect } from "react"
import useFetch from "../../../../hooks/useFetch"
import Gallery from "../../../../components/gallery/Gallery";
import { boatTypes } from "../../../formSource";
import GearModalInput from "../../../../components/gearModal/gearModalInput/GearModalInput";


const NewBoat = ({edit, title}) => {

  if (edit){
    title = "Edit Boat";
  }
  else{
    title = "Add New Boat";
  }

  const location = useLocation();

  const id = location.pathname.split("/")[4];

  const { data, load, error} = useFetch(`http://localhost:8080/api/boat/${id}`)

  const dispatch = useNotification();

  const { user } = useContext(AuthContext);
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.accessToken}`,
  }

  const [showAddServices, setShowAddServices] = useState(false);
  const [services, setServices] = useState([])

  const [files, setFiles] = useState("");

  const [photos, setPhotos] = useState([]);

  const [showFishingGear, setShowFishingGear] = useState(false);
  const [showNavGear, setShowNavGear] = useState(false);

  const [fishingGear, setFishingGear] = useState([])

  const [navGear, setNavGear] = useState([])
  
  const [values, setValues] = useState({
    name: "",
    country: "",
    city: "",
    street: "",
    description: "",
    capacity: "",
    regulations: "",
    price: "",
    fee: "",
    boatType: boatTypes[0].value,
    length: "",
    engineNum: "",
    enginePow: "",
    maxSpeed: "",
  })

  useEffect(() => {
    if (Object.keys(data).length !== 0 && edit){
      const val = {
        'name': data.name,
        'country': data.address.country,
        'city': data.address.city,
        'street': data.address.street,
        'description': data.description,
        'capacity': data.capacity,
        'regulations': data.regulations,
        'price': data.price,
        'fee': data.cancellationFee,
        'boatType': data.boatType,
        'length': data.length,
        'engineNum': data.engineNum,
        'enginePow': data.enginePow,
        'maxSpeed': data.maxSpeed,
      }
      setValues(val);
      setServices(data.additionalServices);
      setNavGear(data.navEquipment);
      setFishingGear(data.fishingEquipment);
      setPhotos(data.images);
    } 
  }, [data])


  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const newBoat = {
        ...values,
        additionalServices: services.map(function(item){
          delete item.id;
          return item;
        }),
        fishingGear: fishingGear.map(({name}) => name),
        navGear: navGear.map(({name}) => name),
        photos: photos,
        owner_id: user.id,
      };

      if (edit){
        await axios.post(`http://localhost:8080/api/edit-boat/${id}`, newBoat, {
          headers: headers
        });  // put ne radi ???
        sendNotification("success", "You successfully edited your boat!");
      }
      else{
        await axios.post("http://localhost:8080/api/add-boat", newBoat, {
          headers: headers
        });
        sendNotification("success", "You successfully added a new boat!");  
      }
      
    } catch (err) {
      console.log(err)
      sendNotification("error", err.message);
    }
  };

  const navGearModal = (e) => {
    e.preventDefault();
    setShowNavGear(!showNavGear);
  }

  const fishingGearModal = (e) => {
    e.preventDefault();
    setShowFishingGear(!showFishingGear);
  }

  const sendNotification = (type, message) => {
    dispatch({
      type: type,
      message: message,
      navigateTo: '/dashboard/my-offers'
    });
  }

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  const additionalServices = (e) => {
    e.preventDefault();
    setShowAddServices(!showAddServices);
  }

  const deleteImages = () => {
    setPhotos([]);
    setFiles("");
  }

  const handleSelect = (e) => {
    setValues({...values, ["boatType"]: e.target.value}); 
    console.log(values.boatType);
  }

  const onUploadImg = (e) => {
    try {
      const list = Promise.all(
        Object.values(e.target.files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/bookerapp/image/upload",
            data
          );
          const { url } = uploadRes.data;
          return url;
        })
      ).then((list)=>{
        setPhotos(photos.concat(list));
        setFiles(files.concat(e.target.files))
      });
      
  } catch (err) {
    console.log(err);
  }
}

  return (
    <div className="newBoat">
      <Sidebar />
      <div className="newContainer">
        <DashNavbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <div className="images">
              <div>Uploaded images:</div>
              {photos.length ? <><Gallery photos={photos} />
              <button className="deleteImgsBtn" onClick={deleteImages}>Delete images</button></>
              :
              <div className="oneImgWrapper">
                <img
                  className="oneImg"
                  src={
                    files
                      ? URL.createObjectURL(files[0])
                      : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  }
                  alt=""
                />
              </div>
              }
            </div>
          </div>
          
          <div className="right">
          <form onSubmit={handleClick}>
              {boatInputs.map((input) => (
                !input.multiline ? (<>
                  {!input.select ? <FormInput 
                    key={input.id}
                    {...input}
                    value={values[input.name]}
                    onChange={onChange}
                  />
                  :
                  <div className="boatTypeSelect"> 
                    <label>Boat Type</label>
                    {!edit && <select onChange={handleSelect}>
                      {boatTypes.map((type) => (
                        <option key={type.id} value={type.value}>
                          {type.type}
                        </option>
                      ))}
                    </select>}
                    {edit && <select onChange={handleSelect} disabled={true}>
                      {boatTypes.map((type) => (
                        <option key={type.id} value={type.value}>
                          {type.type}
                        </option>
                      ))}
                    </select>}
                  </div>
                    }
                  
                </>)
                :
                  <FormTextArea 
                    key={input.id}
                    {...input}
                    value={values[input.name]}
                    onChange={onChange}
                  /> 
              ))}
              <div className="formInput">
                <label htmlFor="file">
                  Upload images: <DriveFolderUploadOutlined className="icon" />
                </label>
                <input
                  type="file"
                  accept="image/png, image/gif, image/jpeg"
                  id="file"
                  multiple
                  onChange={onUploadImg}
                  style={{ display: "none" }}
                />
              </div>
              <div className="buttons">
                <div className="modalsBtns">
                  <button onClick={navGearModal}>Navigation Equipment</button> 
                  <button onClick={fishingGearModal}>Fishing Equipment</button> 
                  <button onClick={additionalServices}>Additional Services</button>
                </div>
                <div className="sendBtnWrapper">
                  {edit && <button className="sendBtn">EDIT</button>
                  }
                  {!edit && <button className="sendBtn">ADD</button>
                  }
                </div>
              </div>
            </form>
            <AdditionalServicesModal 
              services={services} 
              setServices={setServices}
              showAddServices={showAddServices}
              setShowAddServices={setShowAddServices}
            />
            <GearModalInput
              title="Add Navigation Equipment"
              gear={navGear}
              setGear={setNavGear}
              showGear={showNavGear}
              setShowGear={setShowNavGear}
            />
            <GearModalInput
              title="Add Fishing Equipment"
              gear={fishingGear}
              setGear={setFishingGear}
              showGear={showFishingGear}
              setShowGear={setShowFishingGear}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBoat