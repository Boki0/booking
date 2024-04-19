import "./featuredProperties.css"
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router";

const FeaturedPropertiesAdventures = () => {
  const {  data, loading, error } = useFetch("http://localhost:8080/auth/adventures/4offers");
  console.log(data);
 
  const navigate = useNavigate();

  return (
    <div className="fp">
    {loading ? (
      "Loading"
    ) : (
      <>
        {data.map((item) => (
          <div className="fpItem" onClick={() => navigate(`/fishinglessons/${item.id}`)} key={item.id}>
            <img
              src={item.images[0]}
              alt=""
              className="fpImg"
            />
            <span className="fpName">{item.name}</span>
            <span className="fpCity">{item.address.city}</span>
            <span className="fpPrice">Starting from ${item.price}</span>
            {item.rating && <div className="fpRating">
              <button>{item.rating.average.toFixed(1)}</button>
              <span>Excellent</span>
            </div>}
          </div>
        ))}
      </>
    )}
  </div>
);
};


export default FeaturedPropertiesAdventures