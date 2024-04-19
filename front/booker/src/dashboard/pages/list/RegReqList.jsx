import RegRequests from "../../components/datatable/RegRequests"
import DashNavbar from "../../components/navbar/DashNavbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./list.scss"

const RegReqList = () => {
  return (
    <div className="dashList">
      <Sidebar/>
      <div className="dashListContainer">
        <DashNavbar/>
        <RegRequests />
      </div>
    </div>
  )
}

export default RegReqList