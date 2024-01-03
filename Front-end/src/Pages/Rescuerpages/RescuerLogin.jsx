import React from 'react'
import { useState } from 'react';
import { BiLogoGoogle } from "react-icons/bi";
import Loginimage from "../../assets/rescuerRegister.jpg";
import {toast } from 'react-toastify'
import { useNavigate,Link } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { axiospath } from '../../Config/axiosConfig';
import { FETCH_BASE_URL } from '../../Config/fetchConfig';

function RescuerLogin() {
  const[password,setPassword]=useState("")
  const[email,setEmail]=useState("")
  const  Navigate=useNavigate()
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`${FETCH_BASE_URL}/rescuer/Rescuerlogin`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",

        body: JSON.stringify({
          email:email,
          password:password,
        }),
      });
      const data = await res.json();
      console.log(data)
      if (res.ok) {
        
        const localdata=localStorage.setItem("rescuername",data.name)
        const local=localStorage.setItem("rescueremail",data.email)
        
        Navigate("/Rescuer/Home");
        toast.success("Rescuer Login successfully")
      } else {
        toast.error(`${data}`);
      }
    
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error(`${error}`)
    }
  
  };
  

    return (
    
        <form onSubmit={handleLogin}>
        <section className=" h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
          <div className="md:w-1/3 max-w-sm">
            <img
              src={Loginimage}
              alt="Sample image"
            />
          </div >
          <div className="md:w-1/3 max-w-sm mt_">
            <div className="text-center md:text-left">
              <label className="mr-1">Sign in with Google</label>
              <button
               type="button"
               className="mx-1 h-9 w-9 rounded-full bg-blue-500 hover:bg-blue-700 text-white shadow-[0_4px_9px_-4px_#3b71ca]"
              >
            <BiLogoGoogle
             size={20}
            className="flex justify-center items-center w-full"
            />
             </button>
            </div>
            <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
              <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
                Or
              </p>
            </div>
            
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              <a
                className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
                href="#"
              > <Link to="/Rescuer/Forgotpassword">Forgot Password?</Link>
               
              </a>
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
              Don't  Have an account?{" "}
              <a
                className="text-red-600 hover:underline hover:underline-offset-4"
                href="#"
              >
             <Link to="/Rescuer/Registration">Sign-In</Link>
              </a>
            </div>
            <GoogleOAuthProvider clientId="119522868035-tfbaa6lr3a8ue1sd8iqdhh119n7mj5g3.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={async(credentialResponse) => {
                  const decoded = jwtDecode(credentialResponse.credential);
                
                  const res=await axiospath.post("/rescuer/rescuergooglelogin",decoded)

                if(!res.ok){
                  toast.success(" Google Login Successed")
                  
                  const localdata=localStorage.setItem("rescuername",res.data.name)
                  const local=localStorage.setItem("rescueremail",res.data.email)
                  toast.success("A password is Alredy sent to Your Email ")
                  Navigate('/Rescuer/Home');
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

export default RescuerLogin
