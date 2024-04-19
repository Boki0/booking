import React from 'react'
 
import DashNavbar from "../../../dashboard/components/navbar/DashNavbar"
import Sidebar from "../../../dashboard/components/sidebar/Sidebar"
import ReservationsOfClient from './ReservationsOfClient'
import NotificationProvider from '../../../components/notification/NotificationProvider'

const UserReservationList = ({history, typeOfRes}) => {
  return (
    <div className="dashList">
      <Sidebar/>
      <div className="dashListContainer">
        <DashNavbar/>
        <NotificationProvider> 
        <ReservationsOfClient history={history} typeOfRes={typeOfRes} />
        </NotificationProvider>
      </div>
    </div>
  )
}

export default UserReservationList