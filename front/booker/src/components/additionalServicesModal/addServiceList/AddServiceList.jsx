import "./AddServiceList.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons" 


const AddServiceList = ({services, setServices}) => {

  const handleDelete = (id) => {
    setServices(services.filter((service) => service.id !== id))
  }
  
  return (
    <div>
      {services.map((service)=> (
        <li className="list-item" key={service.id}>
          <input 
            type="text"
            value={service.name}
            className="list"
            onChange={(e)=>e.preventDefault()}
          />
            <div className="icon">
              <FontAwesomeIcon icon={faTrash} onClick={()=>handleDelete(service.id)}/>
            </div>
        </li>
      ))}

    </div>
  )
}

export default AddServiceList