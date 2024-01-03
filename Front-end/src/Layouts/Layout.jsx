import React, { useState,useEffect } from 'react'
import Routers from '../Route/Routers'
import Header from '../Components/UserComponents/header'
import Footer from '../Components/UserComponents/Footer'
import AdminHeader from '../Components/AdminComponents/adminHeader'
import RescuerHeader from '../Components/Rescuercomponent/RescuerHeader'
import { useLocation } from 'react-router-dom'
import Loading from '../Components/ForEveryone/Loading'



function Layout() {
  const [loading,setLoading]=useState(true)
  const location=useLocation()
  let adminHeader=location.pathname.startsWith('/Admin')
  let rescuerHeader=location.pathname.startsWith('/Rescuer')
  let userHeader=location.pathname.startsWith('/Users')
  let guest=location.pathname.startsWith('/')
  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(delay);
  }, [])
  return (
    <>
      {loading ? ( <Loading />
      ) : (
        <>
          {adminHeader ? <AdminHeader /> : rescuerHeader ? <RescuerHeader /> : userHeader ? <Header /> : guest ? <Header />  : null}

          <main>
            <Routers />
          </main>

          {adminHeader || rescuerHeader || userHeader ? <Footer /> : null}
        </>
      )}
    </>
  );
}

export default Layout
