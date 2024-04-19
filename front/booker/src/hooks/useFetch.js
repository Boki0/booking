import axios from "axios"
import {useState, useEffect, useContext} from "react"
import {AuthContext} from "../components/context/AuthContext";

const useFetch = (passedUrl) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const url = passedUrl;
  // da bi mi se reload svaki put kad se pozove ovaj useFetch zbog usera

  const {user} = useContext(AuthContext)
  let headers = {};
  if (user){
    headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.accessToken}`,
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try{
        let res;
      
        if (user){
          res = await axios.get(url, {
            headers: headers
          })
        }
        else{
          res = await axios.get(url)
        }
        setData(res.data)
      } catch(err) {
        setError(err)
      }
      setLoading(false)
    }
    fetchData() 

  }, [url])
  
  const reFetch = async () => {
    setLoading(true)
    try{
      const res = await axios.get(url, {
        headers: headers
      })
      setData(res.data)
    } catch(err) {
      setError(err)
    }
    setLoading(false)
  }

  return {data, loading, error, reFetch}

}

export default useFetch;