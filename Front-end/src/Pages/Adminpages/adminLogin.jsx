import React from 'react'
import { useState } from 'react';
import Loginimage from "../../assets/adminlogin.jpg";
import {toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { FETCH_BASE_URL } from '../../Config/fetchConfig';

function adminLogin() {
  const[password,setPassword]=useState("")
  const[email,setEmail]=useState("")
  const [showPassword, setShowPassword] = useState(false);
  const  Navigate=useNavigate()
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    
    if (!email.trim()) {
      toast.error('Please enter a valid email address');
      return;
    }
    // Password validations
    if (password.length < 3 || /^\s|\s$|\s\s+/.test(password)) {
      toast.error('Password must be at least 8 characters long Also no Space allowed');
      return;
    }
    try {
      const res = await fetch(`${FETCH_BASE_URL}/admin/adminlogin`, {
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
  
      // Handle the response, for example:
      if (res.ok) {
        const adminname=localStorage.setItem("adminemail",email)
        const data = await res.json();
        Navigate("/Admin/Home");
        toast.success("Admin Logged successfully")
      } else {
       toast.error("Login Failed")
        console.error("Login failed");
      }
    } catch (error) {
      toast.error("Login Failed")
      console.error("An error occurred:", error);
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
          <label className="mr-1 hover:text-blue-500">Please Enter your Email and Password</label>
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            /><button type="button" onClick={handleTogglePassword}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
            <div className="text-center md:text-left">
              <button
                className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider "
                type="submit"
              >
                Login
              </button>
            </div>
          </div>
        </section>
        </form>
      
      );
}

export default adminLogin
