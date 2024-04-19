import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router";
import "./notification.scss"

const Notification = (props) => {

  const navigate = useNavigate();

  const [exit, setExit] = useState(false);
  const [width, setWidth] = useState(0);

  const [intervalID, setIntervalID] = useState(null);

  const handleStartTimer = () => {
    const id = setInterval(() => {
      setWidth((prev) => {
        if (prev < 100) {
          return prev + 0.5
        }

        clearInterval(id);
        return prev
      })
      
    }, 10);

    setIntervalID(id)
  }

  const handleCloseNotification = () => {
    handlePauseTimer();
    setExit(true)
    setTimeout(() => {
      props.dispatch({
        type: "REMOVE_NOTIFICATION",
        id: props.id
      })
      if (props.type !== 'error' && props.navigateTo)
        navigate(props.navigateTo);
    }, 400)
  }

  useEffect(() => {
    if (width == 100){
      handleCloseNotification();
    }
  })

  const handlePauseTimer = () => {
    clearInterval(intervalID)
  }

  useEffect(() => {
    handleStartTimer()
  }, []) 


  return (
    <div 
      onMouseEnter={handlePauseTimer} 
      onMouseLeave={handleStartTimer} 
      className={`notification-item ${props.type} ${exit ? "exit" : ""} `}
      
    >
      <p>{props.message}</p>
      <div className={"bar"} style={{width: `${width}%`}} />
    </div>
  )
}

export default Notification