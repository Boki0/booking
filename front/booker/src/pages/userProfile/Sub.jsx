import React from 'react'
 
import DashNavbar from "../../dashboard/components/navbar/DashNavbar"
import Sidebar from "../../dashboard/components/sidebar/Sidebar"
import SubList from './SubList'
import NotificationProvider from '../../components/notification/NotificationProvider'


const Sub = () => {
  return (
    <div className="dashList">
      <Sidebar/>
      <div className="dashListContainer">
        <DashNavbar/>
        <NotificationProvider>
        <SubList/>
        </NotificationProvider>
      </div>
    </div>
  )
}

export default Sub