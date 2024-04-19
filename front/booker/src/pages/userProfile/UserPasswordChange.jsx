import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/context/AuthContext";
import '../login/login.css';
import FormInput from "../../components/formInput/FormInput";
import useFetch from "../../hooks/useFetch";
import { useNotification } from "../../components/notification/NotificationProvider";
 

const UserPasswordChange = () => {
   
  const { user } = useContext(AuthContext);
  
  const [values, setValues] = useState({
    newPassword: "",
    repeatNewPassword: "",
  })

  const dispatch = useNotification();

  const sendNotification = (type, message) => {
    dispatch({
      type: type,
      message: message,
      navigateTo: '/'
    });
  }

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

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.accessToken}`,
  }
  const navigate = useNavigate()

  const handleClick = (e) => {
    console.log(values.newPassword)
    e.preventDefault()
    fetch(`http://localhost:8080/api/change-password-not-necessary/${user.id}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(values.newPassword),
      })
        .then(res => {
          if (!res.ok){
            if (res.status == 409){
              console.log('email exists error');
              throw Error('E-mail already exists!');
            }
            console.log('unknown error')
            throw Error('You entered the old password!')
          } 
          return res.json()
        })
        .then(data => {
          sendNotification("success", "You successfully changed the password!");
        })
        .catch(err => {
          sendNotification("error", err.message)
        })
  };

  return (
    <div className="login">
      <div className="lContainer">
        <h1 className="loginTitle" onClick={()=>navigate('/dashboard')}>Change password</h1> 
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
      </div>
    </div>
  );
};

export default UserPasswordChange;