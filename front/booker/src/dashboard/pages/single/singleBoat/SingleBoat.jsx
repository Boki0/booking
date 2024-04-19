import DashNavbar from "../../../components/navbar/DashNavbar"
import Sidebar from "../../../components/sidebar/Sidebar"
import "./singleBoat.scss"

import Gallery from "../../../../components/gallery/Gallery";
import Rating from "../../../components/rating/Rating";
import useFetch from "../../../../hooks/useFetch"
import { useLocation } from "react-router"
import { useState, useEffect } from "react"
import { boatTypes } from "../../../formSource";
import Calendar from "../../../components/calendar/Calendar";
import MapComp from "../../../../components/map/MapComp";

const SingleBoat = () => {

  const location = useLocation();

  const id = location.pathname.split("/")[3];

  const [offer, setOffer] = useState();

  const [loading, setLoading] = useState(true);

  const { data, load, error} = useFetch(`http://localhost:8080/api/boat/${id}`)

  useEffect(() => {
    setOffer(data);
    if (offer) {
      setLoading(false);
    }
  }, [data])

  const formatBoatType = (rawType) => 
  {
    for(let i in boatTypes)
    {
      if (boatTypes[i].value === rawType)
        return boatTypes[i].type;
    }
  }

  return (
    <div className="singleBoat">
      <Sidebar />
      {!loading && <div className="singleContainer">
        <DashNavbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Informations</h1>
            <div className="item">
              <div className="details">
                <h1 className="itemTitle">{offer.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">{offer.address.country}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">City:</span>
                  <span className="itemValue">{offer.address.city}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Street:</span>
                  <span className="itemValue">{offer.address.street}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Capacity:</span>
                  <span className="itemValue">{offer.capacity}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Price:</span>
                  <span className="itemValue">{offer.price}$</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Cancellation Fee:</span>
                  <span className="itemValue">{offer.cancellationFee}$</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Regulations:</span>
                  <span className="itemValue">{offer.regulations}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Type:</span>
                  <span className="itemValue">{formatBoatType(offer.type)}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Length:</span>
                  <span className="itemValue">{offer.length}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Number of Engines:</span>
                  <span className="itemValue">{offer.engineNum}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Engine Power:</span>
                  <span className="itemValue">{offer.enginePow}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Max Speed:</span>
                  <span className="itemValue">{offer.maxSpeed}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Navigation Equipment:</span>
                  <span className="itemValue">{offer.navEquipment}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Fishing Equipment:</span>
                  <span className="itemValue">{offer.fishingEquipment}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Description:</span>
                  <span className="itemValue">{offer.description}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="topRight">
              <h1 className="title">Rating</h1>
              <Rating rating={offer.rating}/>
            </div>
            <div className="bottomRight">
              <h1 className="title">Location</h1>
              <MapComp location={offer.address}/>
            </div>
          </div>
        </div>

        <div className="bottom">
          <div className="bottomTop">
            <h1 className="title">Gallery</h1>
            <Gallery photos={offer.images}/> 
          </div>
          <div className="bottomBottom">
            <h1 className="title">Calendar</h1>
            <Calendar data={offer.periodsOfOccupancy.discounts.concat(offer.periodsOfOccupancy.reservations).concat(offer.periodsOfOccupancy.unavailablePeriods)}/>
          </div>
        </div>
      </div>}
    </div>
  )
}

export default SingleBoat