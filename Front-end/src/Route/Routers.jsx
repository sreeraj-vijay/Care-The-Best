import React, { useEffect, useState } from 'react'
import UserLogin from '../Pages/Userpages/UserLogin'
import UserRegistrationPage from '../Pages/Userpages/UserRegistrationpage'
import UserHome from '../Pages/Userpages/UserHome'
import AdminLogin from '../Pages/Adminpages/adminLogin'
import AdminHome from '../Pages/Adminpages/adminHome'
import RescuerHome from '../Pages/Rescuerpages/RescuerHome'
import RescuerRegistrationPage from '../Pages/Rescuerpages/RescuerRegistration'
import RescuerLogin from '../Pages/Rescuerpages/RescuerLogin'
import Otp from '../Pages/Userpages/otp'
import AddStore from '../Pages/Adminpages/addStore'
import UserDetails from '../Pages/Adminpages/userDetails'
import StoreDetails from '../Pages/Adminpages/storeDetails'
import EditStore from '../Pages/Adminpages/editStore'
import RescuerList from '../Pages/Adminpages/rescuerList'
import RescuerOtp from '../Pages/Rescuerpages/RescuerOtp'
import AdoptHome from '../Pages/Userpages/AdoptHome'
import Forgotpassword from '../Pages/Userpages/Forgotpassword'
import ForgotpasswordOtp from '../Pages/Userpages/forgotpasswordOtp'
import RescuerForgotpassword from '../Pages/Rescuerpages/RescuerForgotpassword'
import RescuerForgotpasswordOtp from '../Pages/Rescuerpages/RescuerForgotpasswordOtp'
import RescuerPorfile from '../Pages/Rescuerpages/RescuerPorfile'
import RescueReport from '../Pages/Rescuerpages/RescueReport'
import AnimalDetails from '../Pages/Userpages/AnimalDetails'
import Userprotected from '../Components/UserComponents/Userprotected'
import Rescuerprotected from '../Components/Rescuercomponent/Rescuerprotected'
import Adminprotected from '../Components/AdminComponents/Adminprotected'
import RescueDetails from '../Pages/Adminpages/RescueDetails'
import Userprofile from '../Pages/Userpages/Userprofile'
import RescueAnimalDetails from '../Pages/Rescuerpages/RescueAnimalDetails'
import AvailableRescuers from '../Pages/Userpages/AvailableRescuers.jsx'
import UserReortrescue from '../Pages/Userpages/UserReortrescue.jsx'
import Contact from '../Components/ForEveryone/Contact.jsx'
import CheckoutSuccess from '../Components/UserComponents/CheckoutSuccess.jsx'
import UserAdopted from '../Pages/Userpages/UserAdopted.jsx'
import UserRescued from '../Pages/Userpages/UserRescued.jsx'
import CreateChatroom from '../Components/ChatComponents/CreateChatroom.jsx'
import ChatcomponentRescuer from '../Components/ChatComponents/ChatComponentRescuer.jsx'
import AdoptionStatus from '../Pages/Adminpages/adoptionStatus.jsx'
import CallRoom from '../Components/Videocall/CallRoom.jsx'
import {Route,Routes} from "react-router-dom"

function Routers() {
  const[isAuthenticated,setIsauthenticated]=useState(false)

  useEffect(()=>{
  
    const username=localStorage.getItem("username")
    if(username){
    setIsauthenticated(username)
    }
  },[])

  return (
    <>
   <Routes>
    {/* UserRoutes */}
    <Route path='/' element={<UserHome />} />
    <Route path='/Users/Login' element={<UserLogin />}/>
    <Route path='/Users/Registration' element={<UserRegistrationPage />} />
    <Route path='/Users/Home' element={<UserHome />} />
    <Route path='/Users/Otp' element={<Otp />}/>
    <Route path='/Users/AdoptHome' element={<AdoptHome />}/>
    <Route path="/Users/OtpForm" element={<Forgotpassword />}/>
    <Route path="/Users/OtpComform" element={<ForgotpasswordOtp />}/>
   <Route path="" element={<Userprotected />}> <Route path="/Users/AnimalDetails" element={<AnimalDetails />}/> </Route>
   <Route path="" element={<Userprotected />}> <Route path="/Users/UserProfile" element={<Userprofile />}/> </Route>
   <Route path="" element={<Userprotected />}> <Route path="/Users/AvilableRescuers" element={<AvailableRescuers />}/> </Route>
   <Route path="" element={<Userprotected />}> <Route path="/Users/UserReortrescue" element={<UserReortrescue />}/> </Route>
   <Route path="" element={<Userprotected />}> <Route path="/Users/Contact" element={<Contact />}/> </Route> 
   <Route path="" element={<Userprotected />}> <Route path="/Users/Checkout-Success" element={<CheckoutSuccess />}/></Route>
   <Route path="" element={<Userprotected />}> <Route path="/Users/UserAdopted" element={<UserAdopted />}/></Route>
   <Route path="" element={<Userprotected />}> <Route path="/Users/UserRescued" element={<UserRescued />}/></Route>
   <Route path="" element={<Userprotected />}> <Route path="/Users/CreateChatroom/:ids" element={<CreateChatroom />}/></Route>

   {/* Video Call */}
   
    <Route path="/VideoCall/Callroom/:id" element={<CallRoom/>}/>






    {/* AdminRoute */}
    <Route path='/Admin/Login' element={<AdminLogin />}/>
    <Route path="" element={<Adminprotected />}><Route path='/Admin/Home' element={<AdminHome />}/></Route>
    <Route path="" element={<Adminprotected />}><Route path='/Admin/Addstore' element={<AddStore />}/></Route>
    <Route path="" element={<Adminprotected />}><Route path="/Admin/Userdetails" element={<UserDetails />} /></Route>
    <Route path="" element={<Adminprotected />}><Route path="/Admin/Liststore" element={<StoreDetails />}/></Route>
    <Route path="" element={<Adminprotected />}><Route path='/Admin/Editstore' element={<EditStore />}/></Route>
    <Route path="" element={<Adminprotected />}><Route path='/Admin/ListRescuer' element={<RescuerList />}/></Route>
    <Route path="" element={<Adminprotected />}><Route path='/Admin/AnimalList' element={<RescueDetails />}/></Route>
    <Route path="" element={<Adminprotected />}><Route path='/Admin/AdoptedAnimals' element={<AdoptionStatus />}/></Route>


    {/* RescuerRoute */}
    <Route path='/Rescuer/Registration' element={<RescuerRegistrationPage />}/>
    <Route path="" element={<Rescuerprotected />}> <Route path='/Rescuer/Home' element={<RescuerHome />}/></Route>
     <Route path='/Rescuer/Login' element={<RescuerLogin />}/>
    <Route path='/Rescuer/RescuerOtp' element={<RescuerOtp />}/>
    <Route path='/Rescuer/Forgotpassword' element={<RescuerForgotpassword />}/>
    <Route path="/Rescuer/RescuerForgotpasswordOtp" element={<RescuerForgotpasswordOtp />}/>
    <Route path="" element={<Rescuerprotected />}> <Route path="/Rescuer/Rescuerprofile" element={<RescuerPorfile />}/></Route>
    <Route path="" element={<Rescuerprotected />}> <Route path="/Rescuer/RescueReport" element={<RescueReport />}/></Route>
    <Route path="" element={<Rescuerprotected />}> <Route path="/Rescuer/RescueDetails" element={<RescueAnimalDetails />}/></Route>
    <Route path="" element={<Rescuerprotected />}> <Route path="/Rescuer/Contact" element={<Contact />}/></Route>
    <Route path="" element={<Rescuerprotected />}> <Route path="/Rescuer/Chatpage" element={<ChatcomponentRescuer />}/></Route>
 
   </Routes>

   </>
  )
}

export default Routers
