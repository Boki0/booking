import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/context/AuthContext";
import "./login.css";
import FormInput from "../../components/formInput/FormInput";
import useFetch from "../../hooks/useFetch";
 

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()
  
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isPasswordChanged = useFetch(`http://localhost:8080/auth/is-password-changed/${credentials.email}`);

  const handleClick = async (e) => {
    e.preventDefault();
   
    dispatch({ type: "LOGIN_START" });
    
    try {
      const res = await axios.post("http://localhost:8080/auth/login", {email:credentials.email, password:credentials.password});
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

      if(isPasswordChanged.data)
        navigate("/")
      else
        navigate("/password-change")
      
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error });
    }
  };


  return (
    <div className="login">
      <div className="lContainer">
        <h1 className="loginTitle" onClick={()=>navigate('/')}>the booker</h1>
        <FormInput
          errorMessage="It should be a valid email address!"
          label="Email"
          required 
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          // className="lInput"
        />
        <FormInput
          label="Password"
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          // className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        {error && <span className="wrong">The email or password is incorrect</span>}
      </div>
    </div>
  );
};

export default Login;