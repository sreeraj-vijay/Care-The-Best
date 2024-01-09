import React, { useState } from "react";
import Loginimage from "../../assets/login1.jpg";
import { useNavigate } from "react-router-dom";
import {toast } from "react-toastify"
import { registerUser } from "../../redux/actions";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { axiospath } from "../../Config/axiosConfig";
import { FETCH_BASE_URL } from "../../Config/fetchConfig";

function UserRegistrationPage() {
  const [name,setName]=useState("")
  const [mobile,setMobile]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const Navigate=useNavigate()
  const dispatch = useDispatch();
  const Resgistersubmission=async(event)=>{
    event.preventDefault();
    if (!name.trim()) {
      toast.error('Please enter a valid email address');
      return;
    }
    if (!/^[0-9]{10}$/.test(mobile.trim())) {
      toast.error('Please enter a valid mobile number');
      return;
    }
    
    if (!email.trim()) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Password validations
    if (password.length < 8 || /^\s|\s$|\s\s+/.test(password)) {
      toast.error('Password must be at least 8 characters long Also no Space allowed');
      return;
    }

    try{
      const res=await fetch(`${FETCH_BASE_URL}/user/Otp`,{
        method:"post",
        headers:{
          "Content-Type": "application/json",
        },
        credentials:"include",
        body:JSON.stringify({
          name:name,
          mobile:mobile,
          email:email,
          password:password,
  
        }),
      })
      const result = await res.json();
      console.log(result)
      if(res.ok){
        dispatch(registerUser(result));
        Navigate('/Users/Otp')
        toast.success('Please Check The OTP !');
        console.log("Enter the otp")
      
      }else{
        throw new Error(result.error)
      }
    }catch(error){
      console.log(error.message)
      toast.error(`Registration Error: ${error.message}`);
    }

  }
    return (
      <form onSubmit={Resgistersubmission}>
        <section className=" h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
          <div className="md:w-1/3 max-w-sm">
            <img 
              src={Loginimage}
              alt="Sample image"
            />
          </div >
          <div className="md:w-1/3 max-w-sm mt_">
            <div className="my-5 flex items-center before:mt-0.5 before:flex-1after:mt-0.5 after:flex-1 ">
              <p className="mx-4 mb-0 text-center font-semibold text-blue-600 hover:text-blue-400">
                Please Enter Your Details
              </p>
            </div>
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
             <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
              type="text"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e)=>setMobile(e.target.value)}
            />
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}

            />
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <div className="mt-4 flex justify-between font-semibold text-sm">
              <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
                <input className="mr-1" type="checkbox" />
                <span>Remember Me</span>
              </label>
            </div>
            <div className="text-center md:text-left">
              <button
                className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                type="submit"
              >
                Login
              </button>
            </div>
            <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
               Have an account?{" "}
              <a
                className="text-red-600 hover:underline hover:underline-offset-4"
                href="#"
              >
               <Link to="/Users/Login">Sign in</Link>
              </a>
            </div>
            <GoogleOAuthProvider clientId="119522868035-tfbaa6lr3a8ue1sd8iqdhh119n7mj5g3.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={async(credentialResponse) => {
                  const decoded = jwtDecode(credentialResponse.credential);
                  console.log(decoded);

                  const res=await axiospath.post("/user/Usergooglelogin",decoded)
                if(!res.ok){
                  toast.success(" Google Login Successed")
                  Navigate('/Users/Home');
                }else{
                  toast.error(" Google Login Failed")
                }
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </GoogleOAuthProvider>
          </div>
        </section>
        </form>
      );
}

export default UserRegistrationPage;
