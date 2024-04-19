import useFetch from "../../hooks/useFetch"
import "./featured.css"
import { motion } from "framer-motion" 

const FeaturedBoats = () => {

  const { data, loading, error } = useFetch("http://localhost:8080/auth/adventures/countByCity?cities=beograd,novi sad,herceg novi")

  return (
    <div className="featured">
      {loading ? "Loading please wait..." : 
      (<><motion.div className="featuredItem"
      initial={{opacity: 0}}
      animate={{opacity: 1}}>
        <img
            src="https://res.cloudinary.com/bookerapp/image/upload/v1655323163/upload/ribolov-slide_icm36h.jpg"
            alt=""
            className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Belgrade</h1>
          <h2>{data[0]} boats</h2>
        </div>
      </motion.div>
      <motion.div className="featuredItem"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
      >
        <img
          src="https://res.cloudinary.com/bookerapp/image/upload/v1655323245/upload/kasapska-ada-novi-sad-pozicija10_fxgbfw.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Novi Sad</h1>
          <h2>{data[1]} boats</h2>
        </div>
      </motion.div>
      <motion.div className="featuredItem"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
      >
        <img
          src="https://res.cloudinary.com/bookerapp/image/upload/v1655323288/upload/arvor_panorama_jifgei.webp"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Herceg Novi</h1>
          <h2>{data[2]} boats</h2>
        </div>
      </motion.div></>)}
    </div>
  )
}

export default FeaturedBoats