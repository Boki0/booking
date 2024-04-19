import "./newCottage.scss"
import { DriveFolderUploadOutlined } from '@mui/icons-material';
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { AuthContext } from "../../../../components/context/AuthContext";
import DashNavbar from '../../../components/navbar/DashNavbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import { cottageInputs } from "../../../formSource";
import FormInput from '../../../../components/formInput/FormInput';
import FormTextArea from "../../../../components/formTextArea/FormTextArea";
import AdditionalServicesModal from "../../../../components/additionalServicesModal/AdditionalServicesModal";
import { useNotification } from "../../../../components/notification/NotificationProvider";
import { useLocation } from "react-router"
import { useEffect } from "react"
import useFetch from "../../../../hooks/useFetch"
import Gallery from "../../../../components/gallery/Gallery";


const NewCottage = ({edit, title}) => {

  const location = useLocation();

  const id = location.pathname.split("/")[4];

  const { data, load, error} = useFetch(`http://localhost:8080/api/cottage/${id}`)

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

  
  const [values, setValues] = useState({
    cottageName: "",
    country: "",
    city: "",
    street: "",
    description: "",
    numOfRooms: "",
    capacity: "",
    regulations: "",
    price: "",
    fee: "",
  })

  console.log(data);

  useEffect(() => {
    if (Object.keys(data).length !== 0 && edit){
      const val = {
        'cottageName': data.name,
        'country': data.address.country,
        'city': data.address.city,
        'street': data.address.street,
        'description': data.description,
        'numOfRooms': data.numOfRooms,
        'capacity': data.capacity,
        'regulations': data.regulations,
        'price': data.price,
        'fee': data.cancellationFee,
      }
      setValues(val);
      setServices(data.additionalServices);
      setPhotos(data.images);

    } 
  }, [data])


  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const newCottage = {
        ...values,
        additionalServices: services.map(function(item){
          delete item.id;
          return item;
        }),
        photos: photos,
        owner_id: user.id,
      };

      if (edit){
        await axios.post(`http://localhost:8080/api/edit-cottage/${id}`, newCottage, {
          headers: headers
        });  // put ne radi ???
        sendNotification("success", "You successfully edited your cottage!");
      }
      else{
        await axios.post("http://localhost:8080/api/add-cottage", newCottage, {
          headers: headers
        });
        sendNotification("success", "You successfully added a new cottage!");  
      }
      
    } catch (err) {
      console.log(err)
      sendNotification("error", err.message);
    }
  };


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
    <div className="newCottage">
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
              {cottageInputs.map((input) => (
                  !input.multiline ? <FormInput 
                    key={input.id}
                    {...input}
                    value={values[input.name]}
                    onChange={onChange}
                  />
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
                <button onClick={additionalServices}>Additional Services</button>
                <button className="sendBtn">ADD</button>
              </div>
            </form>
            <AdditionalServicesModal 
              services={services} 
              setServices={setServices}
              showAddServices={showAddServices}
              setShowAddServices={setShowAddServices}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCottage