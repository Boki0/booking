import { Link } from "react-router-dom";
import "./searchItem.css";
import { useNavigate } from "react-router";
import MiniSlider from "../miniSlider/MiniSlider";
 
const SearchItem = ( {item} ) => {
const navigate = useNavigate();
  return (
    <div className="searchItem">
      {/* <img src={item.images[0]} alt="" className="siImg" /> */}
      <MiniSlider photos={item.images} />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siFeatures">{item.description}</span>
        <span className="siFeatures">{item.address.street}, {item.address.city}</span>

        {item.cancellationFee == 0 && <><span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span></>}
      </div>
      <div className="siDetails">
        {item.rating.average && <div className="siRating">
          <label>Rating</label>
          <button>{item.rating.average.toFixed(1)}</button>
        </div>}
        <div className="siDetailTexts">
          <span className="siPrice">${item.price}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
        
          <button className="siCheckButton"  onClick={() => navigate(`${item.id}`)}>See availability</button>
  
        </div>
      </div>
    </div>
  );
};

export default SearchItem;