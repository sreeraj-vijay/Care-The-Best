import React from 'react'
import { useState,useEffect } from 'react';
import Loginimage from "../../assets/otp.jpg";
import {toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { axiospath } from '../../Config/axiosConfig';
import { FETCH_BASE_URL } from '../../Config/fetchConfig';

function Otp() {
  // getting data From Store
  const user = useSelector(state => state.user);
 
  const[otp,setOtp]=useState("")
  const [second,setSecond]=useState(60)
  const  Navigate=useNavigate()
  useEffect(() => {
    const timer = setInterval(() => {
      setSecond((prevSecond) => prevSecond - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`${FETCH_BASE_URL}/user/Registeruser`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",

        body: JSON.stringify({
         user,
         otp
        }),
      });
  
      const data = await res.json();
      console.log(data)
      if (res.ok) {
      
        Navigate("/Users/Login");
        toast.success("OTP verified And User Registered Successfully")
      } else{
        toast.error(`${data}`)
      }
    } catch(error) {

      toast.error(`${error}`)
      console.error("An error occurred:", error);
    }
  };
  const resendOtp= async () => {

  //  Resent otp

  const res=await axiospath.post("/user/ResendOTP",user)
  const data = await res.data
  console.log(data)
  try{
  if(data){
    toast.success("OTP Resended Successfully")
    user.otp=data
    console.log(user)
    setSecond(60)
  }else{
    toast.success("OTP is not Sended")
  }
}catch(error){
   toast.error(`${data}`)
}

  }
    return (
      <form onSubmit={handleLogin}>
      <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
        <div className="md:w-1/3 max-w-sm">
          <img src={Loginimage} alt="Sample image" />
        </div>
        <div className="md:w-1/3 max-w-sm mt_">
          <div className="mr-1 hover:text-blue-500">Please Enter OTP to Continue</div>
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="text"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <div className="text-center md:text-left">
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
              type="submit"
            >
              Confirm
            </button>
          </div>
          <div className="text-center md:text-left">
            {second > 0 ? (
              <div className="mt-4 bg-white  hover:bg-yellow-100 px-4 py-2 text-black uppercase rounded text-xs tracking-wider">
                Resend OTP in {second}
              </div>
            ) : (
              <button
                className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                type="button"
                onClick={resendOtp}
              >
                Resend OTP
              </button>
            )}
          </div>
        </div>
      </section>
    </form>
      );
}

export default Otp
