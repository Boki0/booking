import useFetch from "../../hooks/useFetch"
import "./featured.css"
import { motion } from "framer-motion" 

const FeaturedBoats = () => {

  const { data, loading, error } = useFetch("http://localhost:8080/auth/boats/countByCity?cities=beograd,novi sad,herceg novi")

  return (
    <div className="featured">
      {loading ? "Loading please wait..." : 
      (<><motion.div className="featuredItem"
      initial={{opacity: 0}}
      animate={{opacity: 1}}>
        <img
            src="https://res.cloudinary.com/bookerapp/image/upload/v1654869289/upload/Iznajmljivanje_brodova_Dunavom_9_.jpg_vu7lup.webp"
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
          src="https://res.cloudinary.com/bookerapp/image/upload/v1654870351/upload/novi_sad_b_ro_dxgadn.jpg"
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
          src="https://res.cloudinary.com/bookerapp/image/upload/v1654870498/upload/161276354_232264478596115_6314479163236407792_n_iosedc.jpg"
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