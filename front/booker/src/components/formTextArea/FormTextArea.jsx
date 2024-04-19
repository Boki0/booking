import "./formTextArea.scss"
import React, { useState } from 'react'

const FormTextArea = (props) => {
  const [focused, setFocused] = useState(false);
  const {label, errorMessage, onChange, id, ...inputProps} = props;


  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className="formTextArea">
      <label className="formLabel">{label}</label>
      <textarea className="formInputInput"
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() => (inputProps.name==="description" || inputProps.name ==="regulations") && setFocused(true)}
        focused={focused.toString()}
      />
      <span className="errorSpan">{errorMessage}</span>
    </div>
  )
}

export default FormTextArea