import React from 'react'
import Reservations from '../../components/datatable/Reservations'
import DashNavbar from "../../components/navbar/DashNavbar"
import Sidebar from "../../components/sidebar/Sidebar"

const ReservationsList = ({history}) => {
  return (
    <div className="dashList">
      <Sidebar/>
      <div className="dashListContainer">
        <DashNavbar/>
        <Reservations history={history}/>
      </div>
    </div>
  )
}

export default ReservationsList