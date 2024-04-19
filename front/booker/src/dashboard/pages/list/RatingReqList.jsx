import RatingRequests from "../../components/datatable/RatingRequests"
import DashNavbar from "../../components/navbar/DashNavbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./list.scss"


const RatingReqList = () => {
  return (
    <div className="dashList">
      <Sidebar/>
      <div className="dashListContainer">
        <DashNavbar/>
          <RatingRequests />
      </div>
    </div>
  )
}

export default RatingReqList