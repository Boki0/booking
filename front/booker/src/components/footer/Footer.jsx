
import { useNavigate } from "react-router";
import "./footer.css";

const Footer = () => {

  const navigate = useNavigate();

  return (
    <div className="footer">
      <div className="footerContainer">
        <div className="fLists">
          <ul className="fList">
            <li className="fListItem" onClick={()=>navigate('/cott')}>Cottages</li>
            <li className="fListItem" onClick={()=>navigate('/boa')}>Boats</li>
            <li className="fListItem" onClick={()=>navigate('/fis')}>Fishing Adventures</li>
          </ul>
          <ul className="fList">
            <li className="fListItem" onClick={()=>navigate('/user-register')}>Client Registration</li>
            <li className="fListItem" onClick={()=>navigate('/host-register')}>Become a Host</li>
            <li className="fListItem" onClick={()=>navigate('/login')}>Login </li>
          </ul>
          <ul className="fList">
            <li className="fListItem">Curtomer Service</li>
            <li className="fListItem">Partner Help</li>
            <li className="fListItem">Terms & conditions</li>
            <li className="fListItem">Copyright © 2022 Booker</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;