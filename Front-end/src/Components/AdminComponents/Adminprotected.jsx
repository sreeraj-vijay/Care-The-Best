import React, { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Adminprotected() {
    const admin = localStorage.getItem("adminemail");
    useEffect(() => {
      if (!admin) {
      
        toast.error('Admin Not Logged .', {
          position: "top-right",
          autoClose: 3000, 
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }, [admin]);
  
      return admin ? <Outlet></Outlet> : <Navigate to='Admin/Login' replace/>
  
  }


export default Adminprotected
