import React, { useState,lazy } from 'react';
import Loginimage from '../../assets/login2.jpg';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import { axiospath } from '../../Config/axiosConfig';
import { FETCH_BASE_URL } from '../../Config/fetchConfig';
import { useDispatch } from 'react-redux';
import { userlogin } from '../../redux/actions';

function UserLogin() {

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const Navigate = useNavigate();
  const dispatch =useDispatch()

  
  const handleLogin = async (event) => {
    event.preventDefault();

    // Email validation
    if (!email.trim()) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Password validations
    if (password.length < 8 || /^\s|\s$|\s\s+/.test(password)) {
      toast.error('Password must be at least 8 characters long Also no Space allowed');
      return;
    }

    try {
      const res = await fetch(`${FETCH_BASE_URL}/user/Userlogin`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data= await res.json()
       
      if (res.ok) {
        dispatch(userlogin(data))
        localStorage.setItem("username",data.name)
        localStorage.setItem("useremail",data.email)
        Navigate('/Users/Home');
        toast.success('User Login successfully');
      } else{
        toast.error(`${data}`);
      }
   } catch (error) {
    
      toast.error("Invalid data");
      console.error('An error occurred:', error);
    }
  
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
          <div className="md:w-1/3 max-w-sm">
            <img src={Loginimage} alt="Sample image" />
          </div>
          <div className="md:w-1/3 max-w-sm mt-">
  
            <div className="my-5 flex items-center before:mt-0.5 before:flex-1after:mt-0.5 after:flex-1 ">
              <p className="mx-4 mb-0 text-center font-semibold text-blue-600 hover:text-blue-400">
                Please Enter Your Details 
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
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="mt-4 flex justify-between font-semibold text-sm">
              <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
                <input className="mr-1" type="checkbox" />
                <span>Remember Me</span>
              </label>
              <a
                className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
                href="#"
              >
                <Link to="/Users/OtpForm">Forgot Password?</Link>
  
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
              Don't Have an account?{' '}
              <a
                className="text-red-600 hover:underline hover:underline-offset-4"
                href="#"
              >
                 <Link to="/Users/Registration">Sign-In</Link>
              </a>
            </div>
            <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
              <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
                Or
              </p>
            </div>
            <GoogleOAuthProvider clientId="119522868035-tfbaa6lr3a8ue1sd8iqdhh119n7mj5g3.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={async(credentialResponse) => {
                  const decoded = jwtDecode(credentialResponse.credential);

                  const res=await axiospath.post("/user/Usergooglelogin",decoded)
                  console.log(res.data.email)
                  
    
                if(!res.ok){
                  toast.success(" Google Login Successed")
                  localStorage.setItem("useremail",res.data.email)
                  localStorage.setItem("username",res.data.name)
                  toast.success("A password is Alredy sent to Your Email ")
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
    </>
  );
}

export default UserLogin;
