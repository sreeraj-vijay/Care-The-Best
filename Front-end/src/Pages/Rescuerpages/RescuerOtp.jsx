import React from 'react'
import { useState,useEffect } from 'react';
import Loginimage from "../../assets/otp.jpg";
import { FETCH_BASE_URL } from '../../Config/fetchConfig';
import {toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { axiospath } from '../../Config/axiosConfig';
import { useSelector } from 'react-redux';

function rescuerOtp() {

  const[otp,setOtp]=useState("")
  const[second,setSecond]=useState(10)
  const  Navigate=useNavigate()
  const rescuer=useSelector(state=>state.rescuer)
  

  useEffect(() => {
    const timer = setInterval(() => {
      setSecond((prevSecond) => prevSecond - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`${FETCH_BASE_URL}/rescuer/RegisterRescuer`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",

        body: JSON.stringify({
        rescuer,
         otp,
        }),
      });
  
      // Handle the response, for example:
      const data = await res.json();
      console.log(data)
      if (res.ok) {
        Navigate("/Rescuer/Login");
        toast.success("OTP verified And User Registered Successfully")
      } else {
       toast.error(`${data}`,"hai")
       
      }
    } catch (error) {
      toast.error("Invalied OTP")
      console.error("An error occurred:", error);
    }
  };
  const resendOtp= async () => {
    const email=rescuer.resuerdata.email
    console.log(email)
    const res=await axiospath.post("/rescuer/RescuerResendOTP",{email:email})
    const data =await res.data
    if(data){
      toast.success("OTP Resended Successfully")
      rescuer.Userotp=data
      setSecond(60)
    }else{
      toast.success("OTP is not Sended")
    }
  
    }
  

    return (
    
        <form onSubmit={handleLogin} encType="multipart/form-data">
        <section className=" h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0 ">
          <div className="md:w-1/3 max-w-sm">
            <img
              src={Loginimage}
              alt="Sample image"
            />
          </div >
          <div className="md:w-1/3 max-w-sm mt_">
          <label className="mr-1 hover:text-blue-500">Please Enter OTP to Continue</label>
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
              type="text"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <div className="text-center md:text-left">
              <button
                className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider "
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

export default rescuerOtp
