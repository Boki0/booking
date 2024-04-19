import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import Home from './pages/home/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Registration from "./pages/registration/Registration"
import DashboardHome from "./dashboard/pages/home/DashboardHome"
import List from './dashboard/pages/list/List';
import RegReqList from './dashboard/pages/list/RegReqList';
import Login from './pages/login/Login';
import New from './dashboard/pages/new/New';
import NotificationProvider from './components/notification/NotificationProvider';
import Single from './dashboard/pages/single/Single';
import Hotels from './pages/hotels/Hotels';
import Cottage from './pages/cottage/Cottage';
import { Switch } from '@mui/material';
import Boat from './pages/boat/boat';
import Boats from './pages/boats/boats';
import FishingLesson from './pages/fishinglesson/FishingLesson';
import FishingLessons from './pages/fishinglessons/fishinglessons';
import UserProfile from './pages/userProfile/UserProfile';
import DeleteReqList from './dashboard/pages/list/DeleteReqList';
import PasswordChange from './pages/login/PasswordChange';
import ReservationsList from './dashboard/pages/list/ReservationsList';
import SingleCottage from './dashboard/pages/single/singleCottage/SingleCottage';
import AdminComplaintList from './dashboard/pages/list/AdminComplaintList';
import RegistrationUser from './pages/registration-user/registrationUser';
import UserReservationList from './pages/userProfile/reservationHistory/reservationListClient';
import PenaltyReqList from './dashboard/pages/list/PenaltyReqList';
import ProfileInfo from './pages/userProfile/ProfileInfo';
import FinancialList from './dashboard/pages/list/FinancialList';
import UserPasswordChange from './pages/userProfile/UserPasswordChange';
import RatingReqList from './dashboard/pages/list/RatingReqList';
import Sub from './pages/userProfile/Sub'




function App() {

  return (
    <Router>
      <div className="App">  
        <div className="content">
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path='cott' element = {<Home page='1'/>} />
              <Route path='boa' element = {<Home page='2'/>} />
              <Route path='fis' element = {<Home page='3'/>} />
              <Route path="login" element={<Login/>}/>
              <Route path='service-reg' element={<Registration />} />
              <Route path='host-register' element={<NotificationProvider><Registration /></NotificationProvider>} />
              <Route path='user-register' element={<NotificationProvider><RegistrationUser userType={'clients'}/></NotificationProvider>} />
              <Route path='register-admin' element={<NotificationProvider><RegistrationUser userType={'administrators'}/></NotificationProvider>} />

              <Route path="/cottages" element={<Hotels/>}/>
              <Route path="/cottages/:id" element={<NotificationProvider><Cottage/></NotificationProvider>  }/>
              <Route path="/boat/:id" element={<NotificationProvider><Boat/></NotificationProvider>}/>
              <Route path="/cott/cottages" element={<Hotels/>}/>
              <Route path="/cott/cottages/:id"  element={<NotificationProvider> <Cottage/></NotificationProvider>}/>
              <Route path="/boa/boats" element={<Boats/>}/>
              <Route path="/boa/boats/:id" element={<NotificationProvider><Boat/></NotificationProvider> }/>
              <Route path="/fis/fishinglessons/:id" element={<NotificationProvider><FishingLesson/></NotificationProvider> }/>
              <Route path="/fishinglessons/:id" element={<NotificationProvider><FishingLesson/></NotificationProvider> }/>
              <Route path="/fis/fishinglessons" element={<FishingLessons/>}/>
              <Route path="/fis/fishinglessons/:id" element={<NotificationProvider><FishingLesson/></NotificationProvider> }/>
              
            </Route>


            <Route path='/client-profile' element={<NotificationProvider><UserProfile authOrApi={"auth"}/>
              </NotificationProvider>}/>

            <Route path='/dashboard'>
              <Route index element={<DashboardHome />} />
              <Route path='my-offers'>
                <Route index element={<List adminRequest={false} serviceType={"offers"}/>} />
                <Route path=':id' element={<Single />} />
                <Route path='new' element={<NotificationProvider><New edit={false} title={'Add New Cottage'}/></NotificationProvider>} />
                <Route path='edit/:id' element={<NotificationProvider><New edit={true} title={'Edit Cottage'}/></NotificationProvider>} />
              </Route> 
              <Route path="password-change-not-necessary" element={<NotificationProvider>
                <UserPasswordChange/>
              </NotificationProvider>}>
              </Route>
              <Route path='cottage-reservation-history' element={<UserReservationList history={true} typeOfRes ={"cott"}/>} />
              <Route path='boats-reservation-history' element={<UserReservationList history={true}  typeOfRes ={"boat"}/>} />
              <Route path='lessons-reservation-history' element={<UserReservationList history={true}  typeOfRes ={"less"}/>} />
              <Route path='future-reservations' element={<UserReservationList history={false}  typeOfRes ={" "}/>} />

              <Route path='profile-info' element={<NotificationProvider><ProfileInfo /></NotificationProvider>}/>
              <Route path='subscriptions' element={<Sub />}/>
              
              <Route path='res-hist' element={<ReservationsList history={true}/>} />
              <Route path='future-res' element={<ReservationsList history={false}/>} />
              <Route path='reports' element={<DashboardHome />} />
              <Route path='profile' element={<NotificationProvider><UserProfile authOrApi={"api"}/>
              </NotificationProvider>}/>
              <Route path="reg-req" element={<RegReqList />}/>
              <Route path="del-req" element={<DeleteReqList />}/>
              <Route path="complaints" element={<AdminComplaintList />}/>
              <Route path="penalty-req" element={<PenaltyReqList />}/>
              <Route path="rating-req" element={<RatingReqList />}/>
              <Route path="financial" element={<FinancialList />}/>
              
              <Route path="cottages"> 
                <Route index element={<List adminRequest={true} userType={'ROLE_COTTAGE_OWNER'} entityType={"cottages"}/>}/>
                <Route path=':id' element={<Single singleType="single_cottage"/>} />
              </Route> 

              <Route path="boats">
                <Route index element={<List adminRequest={true} userType={'ROLE_BOAT_OWNER'} entityType={"boats"}/>}/>
                <Route path=':id' element={<Single singleType="single_boat"/>} />
              </Route> 
              
              <Route path="lessons">
                <Route index element={<List adminRequest={true} userType={'ROLE_INSTRUCTOR'} entityType={"lessons"}/>}/>
                <Route path=':id' element={<Single singleType="single_lesson"/>} />
              </Route> 

              <Route path="service_providers">
                <Route index element={<List adminRequest={true} userType={'ROLE_ADMIN'} entityType={"service_providers"}/>}/>
                <Route path=':id' element={<Single singleType="single_service_provider"/>} />
              </Route> 

              <Route path="clients">
                <Route index element={<List adminRequest={true} userType={'ROLE_ADMIN'} entityType={"clients"}/>}/>
                <Route path=':id' element={<Single singleType="single_client"/>} />
              </Route> 

              <Route path="administrators">
                <Route index element={<List adminRequest={true} userType={'ROLE_SUPER_ADMIN'} entityType={"administrators"}/>}/>
                <Route path=':id' element={<Single singleType="single_administrator"/>} />
              </Route> 

            </Route>
            <Route path="/password-change" element={<NotificationProvider>
              <PasswordChange/>
            </NotificationProvider>}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
