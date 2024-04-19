import { useState } from "react";
import "./formInput.css"

const FormInput = (props) => {
  
  const [focused, setFocused] = useState(false);
  const {label, errorMessage, onChange, id, ...inputProps} = props;


  const handleFocus = (e) => {
    setFocused(true);
    inputProps.enableErrors = true;
  };

  return (
    <div className="formInput">
      <label className="formLabel">{label}</label>
      <input className="formInputInput"
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() => inputProps.name==="confirmPassword" && setFocused(true) && inputProps.enableErrors}
        focused={focused.toString()}
      />
      <span className="errorSpan">{errorMessage}</span>
    </div>
  )
}

export default FormInput