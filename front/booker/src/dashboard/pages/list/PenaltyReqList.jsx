import PenaltyRequests from "../../components/datatable/PenaltyRequests"
import DashNavbar from "../../components/navbar/DashNavbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./list.scss"


const PenaltyReqList = () => {
  return (
    <div className="dashList">
      <Sidebar/>
      <div className="dashListContainer">
        <DashNavbar/>
          <PenaltyRequests />
      </div>
    </div>
  )
}

export default PenaltyReqList