import "./registrationUser.css"
import FormInput from '../../components/formInput/FormInput'
import { useState } from "react"
import { useNotification } from "../../components/notification/NotificationProvider";
import { useNavigate } from "react-router";

const RegistrationUser = ({userType}) => {

  const dispatch = useNotification();

  const [values, setValues] = useState({
    email:"",
    firstName:"",
    lastName:"",
    password:"",
    confirmPassword:"",
    country:"",
    city:"",
    street:"",
    phoneNumber:"",
    type:userType
  })

  const inputs = [
    {
      id:1,
      name:"email",
      type:"email",
      placeholder:"Email",
      errorMessage:"It should be a valid email address!",
      label:"Email",
      required: true, 
    },
    {
      id:2,
      name:"firstName",
      type:"text",
      placeholder:"First Name",
      errorMessage:"Invalid input!",
      label:"First Name",
      required: true,
      pattern: `^[A-Z][a-z ,.'-]+$`
    },
    {
      id:3,
      name:"lastName",
      type:"text",
      placeholder:"Last Name",
      errorMessage:"Invalid input!",
      label:"Last Name",
      required: true,
      pattern: `^[A-Z][a-z ,.'-]+$`
    },
    {
      id:4,
      name:"password",
      type:"password",
      placeholder:"Password",
      errorMessage:"Password should be at least 8 characters!",
      label:"Password",
      required: true,
      pattern: `^.{8,}$`
    },    
    {
      id:5,
      name:"confirmPassword",
      type:"password",
      placeholder:"Confirm Password",
      errorMessage:"Passwords don't match!",
      label:"Confirm Password",
      required: true,
      pattern: values.password
    },
  ]

  const inputsSecondRow = [
    {
      id:6,
      name:"country",
      type:"text",
      placeholder:"Country",
      errorMessage:"Invalid input!",
      label:"Country",
      required: true,
      pattern: `^.{1,}$`
    },
    {
      id:7,
      name:"city",
      type:"text",
      placeholder:"City",
      errorMessage:"Invalid input!",
      label:"City",
      required: true,
      pattern: `^.{1,}$`
    },
    {
      id:8,
      name:"street",
      type:"text",
      placeholder:"Street",
      errorMessage:"Invalid input!",
      label:"Street",
      required: true,
      pattern: `^.{1,}$`
    },
    {
      id:9,
      name:"phoneNumber",
      type:"text",
      placeholder:"Phone Number",
      errorMessage:"Invalid input!",
      label:"Phone Number",
      required: true,
      pattern: "^[0-9]{9,13}$"
    },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:8080/auth/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(values)
      })
        .then(res => {
          if (!res.ok){
            if (res.status == 409){
              console.log('email exists error');
              throw Error('E-mail already exists!');
            }
            console.log('unknown error')
            throw Error('Unknown fetch error occurred!')
          } 
          console.log(res);
          return res.json()
        })
        .then(data => {
          if (userType === 'clients'){
            sendNotification("success", "Please check your email and confirm registration!");
          }
          else {
            sendNotification("success", "You successfully added new administrator!");
          }
        })
        .catch(err => {
          sendNotification("error", err.message)
        })
  }

  const sendNotification = (type, message) => {
    dispatch({
      type: type,
      message: message,
      navigateTo: userType === 'clients' ? '/' : '/dashboard/administrators'
    });
  }

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  const navigate = useNavigate();

  const onCancelClick = (e) => {
    e.preventDefault();

    if (userType === 'clients'){
      navigate('/');
    }
    else {
      navigate('/dashboard/administrators');
    }
  }

  return (
    <div className="registration">
      <div className="form">
        <h1>Registration</h1>
        <form onSubmit={handleSubmit}>
          <div className="formElements">
            <div className="row">
              {inputs.map((input) => (
                <FormInput 
                  key={input.id}
                  {...input}
                  value={values[input.name]}
                  onChange={onChange} 
                />
              ))}
            </div>
            <div className="row">
              {inputsSecondRow.map((input) => (
                <FormInput 
                  key={input.id}
                  {...input}
                  value={values[input.name]}
                  onChange={onChange} 
                />
              ))}
               
            </div>
          </div>
          <div className="buttons">
            <button className="cancel" onClick={onCancelClick}>Cancel</button>
            <button className="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>

  )
}

export default RegistrationUser