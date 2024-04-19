import "./new.scss"
import NewCottage from './newCottage/NewCottage'
import NewBoat from './newBoat/NewBoat'
import NewLesson from "./newLesson/NewLesson"
import { useContext, useState } from "react"
import { AuthContext } from "../../../components/context/AuthContext"


  const New = ({edit, title}) => {

	const { user } = useContext(AuthContext);

  return (
    <div className='new'>
      { user.type === "ROLE_COTTAGE_OWNER" && <NewCottage edit={edit} title={title}/> }
      { user.type === "ROLE_BOAT_OWNER" && <NewBoat edit={edit} title={title}/> }
      { user.type === "ROLE_INSTRUCTOR" && <NewLesson edit={edit} title={title} /> }
    </div>
  )
}

export default New