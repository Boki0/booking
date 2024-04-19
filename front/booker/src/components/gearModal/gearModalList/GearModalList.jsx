import "./gearModalList.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons" 

const GearModalList = ({gear, setGear}) => {

  const handleDelete = (id) => {
    setGear(gear.filter((g) => g.id !== id))
  }

  return (
    <div>
      {gear.map((g)=> (
        <li className="list-item" key={g.id}>
          <input 
            type="text"
            value={g.name}
            className="list"
            onChange={(e)=>e.preventDefault()}
          />
            <div className="icon">
              <FontAwesomeIcon icon={faTrash} onClick={()=>handleDelete(g.id)}/>
            </div>
        </li>
      ))}

    </div>
  )
}

export default GearModalList