import DeleteRequests from "../../components/datatable/DeleteRequests"
import DashNavbar from "../../components/navbar/DashNavbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./list.scss"
import NotificationProvider from "../../../components/notification/NotificationProvider"

const DeleteReqList = () => {
  return (
    <div className="dashList">
      <Sidebar/>
      <div className="dashListContainer">
        <DashNavbar/>
          <DeleteRequests />
      </div>
    </div>
  )
}

export default DeleteReqList