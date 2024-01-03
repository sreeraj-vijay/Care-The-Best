import React, { useEffect, useState } from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { axiospath } from '../../Config/axiosConfig';

function Userprotected() {
  const [userInfo, setUserinfo] = useState([]);
  const navigate = useNavigate();

  const user = localStorage.getItem("username");
  const userEmail = localStorage.getItem("useremail");

  useEffect(() => {
    if (!user) {
      toast.error('Please log in.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [user]);

  useEffect(() => {
    const checkBlocked = async () => {
      try {
        const res = await axiospath.post("/user/checkBlocked", { email: userEmail });
        const result = res.data;

        setUserinfo(result);

        if (result.isListed === false) {
          localStorage.removeItem("username");
          localStorage.removeItem("useremail");
          toast.error("Blocked User");
          navigate("/Users/login");
        }
      } catch (error) {
        console.error("Error checking user data:", error);
      }
    };

    checkBlocked();
  }, [userEmail, navigate]);

  return user ? <Outlet /> : <Navigate to='/Users/Login' replace />;
}

export default Userprotected;
