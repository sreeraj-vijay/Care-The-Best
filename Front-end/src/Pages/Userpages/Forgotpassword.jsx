import React, { useState } from 'react';
import Loginimage from '../../assets/login2.jpg';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FETCH_BASE_URL } from '../../Config/fetchConfig';
import { useDispatch } from 'react-redux';
import { userlogin } from '../../redux/actions';

function Forgotpassword() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')

  const Navigate = useNavigate();
  const dispatch = useDispatch()

  const handleForgotpassword = async (event) => {
    event.preventDefault();
    const userdata = {
      email: email,
      password: password,
      mobile: mobile
    }
    const userdataString = JSON.stringify(userdata);

    const errorarray = [];

    if (!mobile.trim()) {
      errorarray.push('Please enter a valid mobile number');
    }

    // Email validation
    if (!email.trim()) {
      errorarray.push('Please enter a valid email address');
    }

    // Password validations
    if (password.length < 8 || /^\s|\s$|\s\s+/.test(password)) {
      errorarray.push('Password must be at least 8 characters long. Also, no spaces are allowed.');
    }


    if (errorarray.length > 0) {
      errorarray.forEach((errorss) => {
        toast.error(errorss);
      });
      return;
    }



    try {
      const res = await fetch(`${FETCH_BASE_URL}/user/Forgotpassword`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: email,
          password: password,
          mobile: mobile
        }),
      });
      const data = await res.json();
      console.log(data)

      if (res.ok) {
        dispatch(userlogin(data))
        Navigate('/Users/OtpComform')
        toast.success("Please Enter the otp");
      } else {
        toast.error('User not Found');
        console.error('User not Found');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
      console.error('An error occurred:', error);
    }
  };

  return (
    <>
      <form onSubmit={handleForgotpassword}>
        <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
          <div className="md:w-1/3 max-w-sm">
            <img src={Loginimage} alt="Sample image" />
          </div>
          <div className="md:w-1/3 max-w-sm mt-">
            <div className="my-5 flex items-center before:mt-0.5 before:flex-1after:mt-0.5 after:flex-1 ">
              <p className="mx-4 mb-0 text-center font-semibold text-blue-600 hover:text-blue-400">
                Please Enter Your Details For Updating Password
              </p>
            </div>
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
              type="text"
              placeholder="Enter the mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />

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
            </div>
            <div className="text-center md:text-left">
              <button
                className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                type="submit"
              >
                Update New password
              </button>
            </div>
          </div>
        </section>
      </form>
    </>
  );
}

export default Forgotpassword;
