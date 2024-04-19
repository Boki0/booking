import "./sidebar.scss"
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import PhishingOutlinedIcon from '@mui/icons-material/PhishingOutlined';
import DirectionsBoatFilledOutlinedIcon from '@mui/icons-material/DirectionsBoatFilledOutlined';
import {Link} from "react-router-dom"
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PhishingIcon from '@mui/icons-material/Phishing';
import SailingIcon from '@mui/icons-material/Sailing';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import GroupIcon from '@mui/icons-material/Group';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import { useContext } from "react";
import { AuthContext } from "../../../components/context/AuthContext";
import { useNavigate } from "react-router";
import DeleteIcon from '@mui/icons-material/Delete';
import NearbyErrorIcon from '@mui/icons-material/NearbyError';
import GradeIcon from '@mui/icons-material/Grade';

const Sidebar = () => {

  const navigate = useNavigate();

  const { user, dispatch } = useContext(AuthContext);

  const logout = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    navigate('/login');
  }

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{textDecoration: "none"}}>
          <span className="logo">the booker</span>
        </Link>
      </div>
      <hr />
      <div className="center">



      {user.type=='ROLE_CLIENT' && (<><ul>
        <p className="title">HISTORY</p>
        
        <Link to="/dashboard/cottage-reservation-history" style={{textDecoration: "none"}}>
          <li>
            <CottageOutlinedIcon className="icon" /> 
            <span>Booking history for cottages</span>
          </li>
        </Link>
        <Link to="/dashboard/boats-reservation-history" style={{textDecoration: "none"}}>
          <li>
            <DirectionsBoatFilledOutlinedIcon className="icon" /> 
            <span>Booking history for boats</span>
          </li>
        </Link>
        <Link to="/dashboard/lessons-reservation-history" style={{textDecoration: "none"}}>
          <li>
            <PhishingOutlinedIcon className="icon" /> 
            <span>Booking history for lessons</span>
          </li>
        </Link>
        <p className="title">FUTURE RESERVATIONS</p>
        <Link to="/dashboard/future-reservations" style={{textDecoration: "none"}}>
          <li>
          <ViewListOutlinedIcon className="icon" />
            <span>Future Reservations</span>
          </li>
        </Link> 

        <p className="title">SUBSCRIPTIONS</p>
        <Link to="/dashboard/subscriptions" style={{textDecoration: "none"}}>
          <li>
          <ViewListOutlinedIcon className="icon" />
            <span>Subscriptions</span>
          </li>
        </Link>
        <p className="title">USER</p>
      <Link to="/dashboard/profile-info" style={{textDecoration: "none"}}>
        <li>
          <PersonOutlinedIcon className="icon" />
          <span>Profile</span>
        </li>
      </Link>
      <li onClick={logout}>
        <LogoutOutlinedIcon className="icon" />
        <span>Logout</span>
      </li>

      </ul></>)}

    







        {user.type !== 'ROLE_SUPER_ADMIN' && user.type !== 'ROLE_ADMIN' && user.type!=='ROLE_CLIENT' && (<><ul>
        <p className="title">LISTS</p>
        
        <Link to="/dashboard/my-offers" style={{textDecoration: "none"}}>
          <li>
            { user.type === 'ROLE_COTTAGE_OWNER' && <CottageOutlinedIcon className="icon" /> }
            { user.type === 'ROLE_INSTRUCTOR' && <PhishingOutlinedIcon className="icon" /> }
            { user.type === 'ROLE_BOAT_OWNER' && <DirectionsBoatFilledOutlinedIcon className="icon" /> }
            <span>My Offers</span>
          </li>
        </Link>
        <Link to="/dashboard/res-hist" style={{textDecoration: "none"}}>
          <li>
            <ViewListOutlinedIcon className="icon" />
            <span>Reservations History</span>
          </li>
        </Link>
        <Link to="/dashboard/future-res" style={{textDecoration: "none"}}>
          <li>
            <ViewListOutlinedIcon className="icon" />
            <span>Future Reservations</span>
          </li>
        </Link>
        <p className="title">REPORTS</p>
        <Link to="/dashboard/reports" style={{textDecoration:"none"}}>
          <li>
            <AssessmentOutlinedIcon className="icon" />
            <span>Reports</span>
          </li>
        </Link>

        <p className="title">USER</p>

        <li>
          <NotificationsActiveOutlinedIcon className="icon" />
          <span>Notifications</span>
        </li>
        <Link to="/dashboard/profile-info" style={{textDecoration: "none"}}>
          <li>
            <PersonOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
        </Link>
          <li onClick={logout}>
            <LogoutOutlinedIcon className="icon" />
            <span>Logout</span>
          </li>
      </ul></>)}
          
      { (user.type === 'ROLE_ADMIN' || user.type === 'ROLE_SUPER_ADMIN') && (<><ul>
      <p className="title">OFFERS</p>

      <Link to="/dashboard/cottages" style={{textDecoration: "none"}}>
        <li>
          <CottageOutlinedIcon className="icon"/>
          <span>Cottages</span>
        </li>
      </Link>
      
      <Link to="/dashboard/boats" style={{textDecoration: "none"}}>
        <li>
          <SailingIcon className="icon" />
          <span>Boats</span>
        </li>
      </Link>
      
      <Link to="/dashboard/lessons" style={{textDecoration: "none"}}>
        <li>
          <PhishingIcon className="icon" />
          <span>Fishing Lessons</span>
        </li>
      </Link>

      <p className="title">USERS</p>
      <Link to="/dashboard/clients" style={{textDecoration: "none"}}>
        <li>
          <GroupIcon className="icon" />
          <span>Clients</span>
        </li>
      </Link>

      <Link to="/dashboard/service_providers" style={{textDecoration: "none"}}>
        <li>
          <SupervisedUserCircleIcon className="icon" />
          <span>Service Providers</span>
        </li>
      </Link>
      <Link to="/dashboard/administrators" style={{textDecoration: "none"}}>
        {user.type === 'ROLE_SUPER_ADMIN' && <li>
          <AdminPanelSettingsIcon className="icon" />
          <span>Administrators</span>
        </li>}
      </Link>

      <p className="title">REQUESTS</p>
      <Link to="/dashboard/reg-req" style={{textDecoration: "none"}}>
        <li>
          <ContactMailIcon className="icon" />
          <span>Registration Requests</span>
        </li>
      </Link>
      <Link to="/dashboard/del-req" style={{textDecoration: "none"}}>
        <li>
          <DeleteIcon className="icon" />
          <span>Deletion Requests</span>
        </li>
      </Link>
      <Link to="/dashboard/complaints" style={{textDecoration: "none"}}>
        <li>
          <ThumbDownAltIcon className="icon" />
          <span>Complaints</span>
        </li>
      </Link>
      <Link to="/dashboard/penalty-req" style={{textDecoration: "none"}}>
        <li>
          <NearbyErrorIcon className="icon" />
          <span>Penalty Requests</span>
        </li>
      </Link>
      <Link to="/dashboard/rating-req" style={{textDecoration: "none"}}>
        <li>
          <GradeIcon className="icon" />
          <span>Rating Requests</span>
        </li>
      </Link>
      
      <p className="title">FINANCIAL</p>
      <Link to="/dashboard/financial" style={{textDecoration: "none"}}>
        <li>
          <AttachMoneyIcon className="icon" />
          <span>Financial</span>
        </li>
      </Link>

      <p className="title">LOYALTY PROGRAM</p>
      <li>
        <MilitaryTechIcon className="icon" />
        <span>Loyalty Program</span>
      </li>

      <p className="title">REPORTS</p>
      <li>
        <AssessmentOutlinedIcon className="icon" />
        <span>Reports</span>
      </li>

      <p className="title">USER</p>
      <li>
        <NotificationsActiveOutlinedIcon className="icon" />
        <span>Notifications</span>
      </li>
      <Link to="/dashboard/profile-info" style={{textDecoration: "none"}}>
        <li>
          <PersonOutlinedIcon className="icon" />
          <span>Profile</span>
        </li>
      </Link>
      <li onClick={logout}>
        <LogoutOutlinedIcon className="icon" />
        <span>Logout</span>
      </li>
    </ul></>)}
    </div> 
  </div>
  )
}

export default Sidebar