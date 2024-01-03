import React, { useEffect, useState } from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { axiospath } from '../../Config/axiosConfig';

function RescuerProtected() {
  const navigate = useNavigate();
  const [rescuerinfo, setRescuerinfo] = useState([]);
  const rescuer = localStorage.getItem("rescuername");

  useEffect(() => {
    if (!rescuer) {
      // Display toast error
      toast.error('Please log in as a rescuer.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [rescuer]);

  const checkBlocked = async () => {
    try {
      const email = localStorage.getItem("rescueremail");
      const res = await axiospath.post("/rescuer/checkBlocked", { email: email });
      const result = res.data;
      setRescuerinfo(result);

      if (result.isListed === true) {
        localStorage.removeItem("rescuername");
        localStorage.removeItem("rescueremail");
        toast.error("Blocked Rescuer");
        navigate("/Rescuer/login");
      }
    } catch (error) {
      console.error("Error checking rescuer data:", error);
  
    }
  };

  useEffect(() => {
    checkBlocked();
  }, [rescuer]);

  return rescuer ? <Outlet /> : <Navigate to='Rescuer/Login' replace />;
}

export default RescuerProtected;
