import Datatable from "../../components/datatable/Datatable"
import DashNavbar from "../../components/navbar/DashNavbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./list.scss"
import DatatableAdmin from "../../components/datatable/DatatableAdmin"

const List = ({adminRequest, userType, entityType}) => {
  return (
    <div className="dashList">
      <Sidebar/>
      <div className="dashListContainer">
        <DashNavbar/>
        {adminRequest == false && <Datatable />}
        {adminRequest == true && <DatatableAdmin userType={userType} entityType={entityType}/>}
      </div>
    </div>
  )
}

export default List