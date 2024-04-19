import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/context/AuthContext";
import "./login.css";
import FormInput from "../../components/formInput/FormInput";
import useFetch from "../../hooks/useFetch";
import { useNotification } from "../../components/notification/NotificationProvider";
import { AirTwoTone } from "@mui/icons-material";
 

const PasswordChange = () => {
   
  const [values, setValues] = useState({
    newPassword: "",
    repeatNewPassword: "",
  })

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }
  
  const inputs = [{
    id:1,
    name:"newPassword",
    type:"password",
    placeholder:"New Password",
    errorMessage:"New Password should be at least 8 characters!",
    label:"New Password",
    required: true,
    pattern: `^.{8,}$`
  },    
  {
    id:2,
    name:"repeatNewPassword",
    type:"password",
    placeholder:"Repeat New Password",
    errorMessage:"Passwords don't match!",
    label:"Repeat New Password",
    required: true,
    pattern: values.newPassword
  },
]

  const { user } = useContext(AuthContext);

  const headers = user && {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.accessToken}`,
  }
  const navigate = useNavigate()

  const [error, setError] = useState(false); 


  const handleClick = async (e) => {

    e.preventDefault()

    try{
      const res = await axios.post(`http://localhost:8080/api/change-password/${user.id}`, {newPassword: values.newPassword}, {
        headers: headers
      });
      console.log('test res')
      navigate('/login')

    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <h1 className="loginTitle" onClick={()=>{setError(false); navigate('/login');}}>Change password</h1> 
        {inputs.map((input) => (
            <FormInput 
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange} 
            />
        ))}
        
        <button onClick={handleClick} className="lButton" disabled={!values.newPassword.match(inputs[0].pattern) || !values.repeatNewPassword.match(inputs[0].pattern) || values.newPassword !== values.repeatNewPassword}>
          Submit
        </button>
        {error && <span className="wrong">You can't enter your old password</span>}

      </div>
    </div>
  );
};

export default PasswordChange;