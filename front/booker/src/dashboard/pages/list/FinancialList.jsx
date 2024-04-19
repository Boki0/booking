import FinancialTable from "../../components/datatable/FinancialTable"
import DashNavbar from "../../components/navbar/DashNavbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./list.scss"

const FinancialList = () => {
  return (
    <div className="dashList">
      <Sidebar/>
      <div className="dashListContainer">
        <DashNavbar/>
        <FinancialTable/>
      </div>
    </div>
  )
}

export default FinancialList