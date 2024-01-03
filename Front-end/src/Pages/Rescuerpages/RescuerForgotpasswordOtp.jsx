import React, { useState,useEffect } from 'react';
import Loginimage from '../../assets/login2.jpg';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FETCH_BASE_URL } from '../../Config/fetchConfig';
import { useSelector } from 'react-redux';



function RescuerForgotpasswordOtp() {
  const [otp,setOtp]=useState('')
  const [second,setSecond]=useState(60)
  const Navigate = useNavigate();
  const rescuer=useSelector(state=>state.rescuer)
  console.log(rescuer)
  useEffect(() => {
    const timer = setInterval(() => {
      setSecond((prevSecond) => prevSecond - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleForgotpasswordotp = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(`${FETCH_BASE_URL}/rescuer/ForgotpasswordOtp`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          otp,
          rescuer
        }),
      });
      const data = await res.json();

      if (res.ok) {
        Navigate('/Rescuer/Login');
        toast.success("Password  Updated Successfully");
      } else{
        toast.error(`${data}`);
        console.error('Password Updation Failed');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
      console.error('An error occurred:', error);
    }
  };
  const resendOtp= async () => {
    const res = await fetch(`${FETCH_BASE_URL}/rescuer/forgotpasswordResendOTP`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        rescuer
      }),
    });
    console.log(res)
    const data=await res.json()
    console.log(data.otp)
    
    if(res.ok){
      rescuer.Userotp=data.otp
      toast.success("!OTP Resended Successfully")
      setSecond(60)
    }else{
      toast.error("OTP is not Sended")
    }
  
    }

  return (
    <>
      <form onSubmit={handleForgotpasswordotp}>
        <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
          <div className="md:w-1/3 max-w-sm">
            <img src={Loginimage} alt="Sample image" />
          </div>
          <div className="md:w-1/3 max-w-sm mt-">
            <div className="my-5 flex items-center before:mt-0.5 before:flex-1after:mt-0.5 after:flex-1 ">
              <p className="mx-4 mb-0 text-center font-semibold text-blue-600 hover:text-blue-400">
                Please Enter The OTP
              </p>
            </div>
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
              type="text"
              placeholder="Enter the OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <div className="text-center md:text-left">
              <button
                className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                type="submit"
                
              >
                Continue
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
    </>
  );
}

export default RescuerForgotpasswordOtp;
