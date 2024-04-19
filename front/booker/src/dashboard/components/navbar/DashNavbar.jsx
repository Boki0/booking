import "./navbar.scss"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import { useContext } from "react";
import { useNavigate } from "react-router"; 

const DashNavbar = () => {

  const navigate = useNavigate()

  // const {user} = useContext(AuthContext);

  return (
    <div className="dashNavbar">
      <div className="dashWrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <FormatListBulletedOutlinedIcon className="icon"/>
          </div>
          <div className="item">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
              onClick={()=>navigate('/dashboard/profile')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashNavbar