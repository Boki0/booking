import "./gearModalInput.scss"
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import {v4 as uuidv4} from "uuid";
import GearModalList from "../gearModalList/GearModalList"
import { useState } from "react";
import FormInput from "../../formInput/FormInput";

const GearModalInput = ({title, gear, setGear, showGear, setShowGear}) => {

  //ostaviti space zbog razdvajanja pojedine opreme 
  //najjednostavnije je bilo ovako raditi, nisam se hteo cimati
  const [gearName, setGearName] = useState(" ");

  const handleSubmit = () => {
  }

  const addBtnClick = (e) => {
    e.preventDefault();
    setGear([...gear, {id: uuidv4(), name: gearName}]);
  }

  return (
    <>
    <Dialog className="gearDialog" open={showGear} onClose={() => setShowGear(!showGear)} onSubmit={handleSubmit}>
      <DialogTitle className="dialogTitle">{title}</DialogTitle>
      <hr/>
      <DialogContent className="dialogContent">
        <form onSubmit={addBtnClick}>
          <div className="inputs">
            <FormInput
              type="text"
              placeholder="Enter name of gear"
              value={gearName}
              required
              onChange={(e)=>setGearName(e.target.value)}
              label="Gear name"
              errorMessage="This field is required!"
            />
          </div>
          <button className="addBtn">ADD</button>
        </form>

        <GearModalList gear={gear} setGear={setGear}/>
      </DialogContent>
    </Dialog>
    </>
  )
}

export default GearModalInput