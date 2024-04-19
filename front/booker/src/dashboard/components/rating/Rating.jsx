import "./rating.scss"
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Rating = ({rating}) => {
  console.log(rating.average)
  return (
    <div className="featured">
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={rating.average.toFixed(1)*10} text={rating.average.toFixed(1)} strokeWidth={5} />
        </div>
        <p className="title">Number of votes</p>
        <p className="amount">{rating.numOfVotes}</p>
      </div>
    </div>
  );
}

export default Rating