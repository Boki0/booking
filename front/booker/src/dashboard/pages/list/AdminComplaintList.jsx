import AdminComplaints from "../../components/datatable/AdminComplaints"
import DashNavbar from "../../components/navbar/DashNavbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./list.scss"


const AdminComplaintList = () => {
  return (
    <div className="dashList">
      <Sidebar/>
      <div className="dashListContainer">
        <DashNavbar/>
          <AdminComplaints />
      </div>
    </div>
  )
}

export default AdminComplaintList