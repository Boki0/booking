import React from 'react'
 
import DashNavbar from "../../dashboard/components/navbar/DashNavbar"
import Sidebar from "../../dashboard/components/sidebar/Sidebar"
import ClientInfo from './UserInfo'


const ProfileInfo = () => {
  return (
    <div className="dashList">
      <Sidebar/>
      <div className="dashListContainer">
        <DashNavbar/>
        <ClientInfo/>
      </div>
    </div>
  )
}

export default ProfileInfo