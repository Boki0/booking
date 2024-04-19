import "./miniSlider.scss";
import {motion} from 'framer-motion'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";


const MiniSlider = ({photos}) => {

  const [slideNumber, setSlideNumber] = useState(0);

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? photos.length-1 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === photos.length - 1 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };

  
  return (
    <div className="miniSlider">
      <FontAwesomeIcon
        icon={faCircleArrowLeft}
        className="miniArrow"
        onClick={() => handleMove("l")}
      />
      <div className="sliderWrapper">
        <img 
          src={photos[slideNumber]} 
          alt="" 
          className="miniSliderImg" />
      </div>
      <FontAwesomeIcon
        icon={faCircleArrowRight}
        className="miniArrow"
        onClick={() => handleMove("r")}
      />
  </div>
 
)}

export default MiniSlider