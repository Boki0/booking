import useFetch from "../../hooks/useFetch"
import "./featured.css"
import { motion } from "framer-motion" 

const Featured = () => {

  const { data, loading, error } = useFetch("http://localhost:8080/auth/cottages/countByCity?cities=beograd,novi sad,herceg novi")

  return (
    <div className="featured">
      {loading ? "Loading please wait..." : 
      (<><motion.div className="featuredItem"
      initial={{opacity: 0}}
      animate={{opacity: 1}}>
        <img
            src="https://media.timeout.com/images/105741308/750/422/image.jpg"
            alt=""
            className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Belgrade</h1>
          <h2>{data[0]} properties</h2>
        </div>
      </motion.div>
      <motion.div className="featuredItem"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
      >
        <img
          src="https://dynamic-media-cdn.tripadvisor.com/media/photo-c/2560x500/1d/64/1b/11/caption.jpg?w=600&h=600&s=1"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Novi Sad</h1>
          <h2>{data[1]} properties</h2>
        </div>
      </motion.div>
      <motion.div className="featuredItem"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
      >
        <img
          src="https://www.montenegro.com/w_2560//images/uploads/montenegro/stock/montenegro/primorje/hercegnovi/AdobeStock_162039643.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Herceg Novi</h1>
          <h2>{data[2]} properties</h2>
        </div>
      </motion.div></>)}
    </div>
  )
}

export default Featured