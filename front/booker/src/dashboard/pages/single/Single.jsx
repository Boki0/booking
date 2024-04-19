import React, { useContext } from 'react'
import { AuthContext } from '../../../components/context/AuthContext';
import SingleCottage from "./singleCottage/SingleCottage";
import SingleLesson from "./singleLesson/SingleLesson";
import SingleBoat from './singleBoat/SingleBoat';

const Single = ({singleType}) => {
	const { user } = useContext(AuthContext);

  return (
    <div className='new'>
      { user.type === "ROLE_COTTAGE_OWNER" && <SingleCottage/> }
      { user.type === "ROLE_BOAT_OWNER" && <SingleBoat /> }
      { user.type === "ROLE_INSTRUCTOR" && <SingleLesson /> }
      { (user.type === "ROLE_ADMIN" || user.type === "ROLE_SUPER_ADMIN") && singleType === "single_cottage" && <SingleCottage /> }
      
      {(user.type === "ROLE_ADMIN" || user.type === "ROLE_SUPER_ADMIN") && singleType === "single_boat" && <SingleBoat /> }

      { (user.type === "ROLE_ADMIN" || user.type === "ROLE_SUPER_ADMIN") && singleType === "single_lesson" && <SingleLesson /> }
    </div>
  )
}

export default Single