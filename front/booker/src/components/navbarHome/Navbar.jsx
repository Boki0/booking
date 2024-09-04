import { useNavigate } from "react-router-dom"
import "./navbar.css"
import { useContext } from "react";
import {AuthContext} from "../context/AuthContext";
import { Link } from 'react-router-dom';
import { Button } from "@mui/material";


const NavbarHome = () => {
  const { user,dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const usersWithDashboard = [
    "ROLE_COTTAGE_OWNER",
    "ROLE_BOAT_OWNER",
    "ROLE_INSTRUCTOR",
    "ROLE_ADMIN",
    "ROLE_SUPER_ADMIN",
    "ROLE_CLIENT"
  ]

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    navigate('/login');
  }

  const onDashboardClick = () => {
    if (user.type === "ROLE_COTTAGE_OWNER" || user.type === "ROLE_BOAT_OWNER" || user.type === "ROLE_INSTRUCTOR"){
      navigate('/dashboard/my-offers');
    }
    else if (user.type === "ROLE_ADMIN" || user.type === "ROLE_SUPER_ADMIN"){
      navigate('/dashboard/financial');
    }
    else {
      navigate('/dashboard/cottage-reservation-history');
    }
  }

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Booker</span>
        </Link>
        {user ?  (
          <div>
            {usersWithDashboard.indexOf(user.type) > -1 && <button onClick={onDashboardClick} className="navButton">Dashboard</button>}

          {/* {user.email} */}
          <button className="navButton"onClick={handleClick}>Logout</button>
          </div>
        ) 
        : (
          <div className="navItems">
            <button className="navButton" onClick={()=>navigate('/host-register')}>Become a Host</button>
            <button className="navButton" onClick={()=>navigate('/user-register')}>Register</button>
            <button id="login-button"  className="navButton" onClick={()=>navigate('/login')}>Login</button>
          </div>
        )}
      </div>
 
    </div>
  );
};

export default NavbarHome;