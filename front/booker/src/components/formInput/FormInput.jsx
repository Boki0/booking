import { useState } from "react";
import "./formInput.css";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
    inputProps.enableErrors = true;
  };

  return (
    <div className="formInput">
      {label && <label className="formLabel" htmlFor={id}>{label}</label>}
      <input
        {...inputProps}
        id={id ? id : undefined} // Dodaj id samo ako je prisutan
        className="formInputInput"
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() => inputProps.name === "confirmPassword" && setFocused(true) && inputProps.enableErrors}
        focused={focused.toString()}
      />
      {errorMessage && <span className="errorSpan">{errorMessage}</span>}
    </div>
  );
};

export default FormInput;