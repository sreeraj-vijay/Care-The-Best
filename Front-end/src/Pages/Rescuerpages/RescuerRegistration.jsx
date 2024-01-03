import React, { useState } from "react";
import Loginimage from "../../assets/rescuerlogin.jpg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { axiospath } from "../../Config/axiosConfig";
import { rescuerregister } from "../../redux/actions";
import { useDispatch } from "react-redux";

function RescuerRegistrationPage() {
  const [data,setData]=useState([])
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [certificate, setCertificate] = useState(null);

  const isImageFile = (file) => {
    const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return acceptedImageTypes.includes(file.type);
  };

  const imageHandler = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && !isImageFile(selectedFile)) {
      toast.error('Please select a valid image file (e.g., JPEG, PNG, GIF).');
      e.target.value = '';
      return;
    }
    setCertificate(selectedFile);
  };

  const Navigate = useNavigate();
  const dispatch=useDispatch()

  const RegisterSubmission = async (event) => {
    event.preventDefault();

    const errors=[]
    if (!name.trim()) {
      errors.push('Please enter a valid email address');
     
    }
    if (!/^[0-9]{10}$/.test(mobile.trim())) {
      errors.push('Please enter a valid mobile number');
      
    }
    
    if (!email.trim()) {
      errors.push('Please enter a valid email address');
   
    }
    if(!certificate){
      errors.push("Please Upload The Certificate")
      
    }
    else {
      const allowedImageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
      const fileExtension = certificate.name.split('.').pop().toLowerCase();
      if (!allowedImageExtensions.includes(fileExtension)) {
        errors.push("Invalid file extension. Please upload an image ");
       
      } 
    }

    // Password validations
    if (password.length < 8 || /^\s|\s$|\s\s+/.test(password)) {
      errors.push('Password must be at least 8 characters long Also no Space allowed');
      
    }
    if(errors.length>0){
     errors.forEach((error)=>{
      toast.error(error)

     })
     return
    }

    const formdataToSend = new FormData();
    formdataToSend.append("name", name);
    formdataToSend.append("mobile", mobile);
    formdataToSend.append("email", email);
    formdataToSend.append("password", password);
    formdataToSend.append("Certificate", certificate);
  
    const formDataObject = {};
    formdataToSend.forEach((value, key) => {
      formDataObject[key] = value;
    });
    try {
      
      const res=await axiospath.post("/rescuer/RescuerOtp",formdataToSend)     
    const rescuerdata=await res.data
      if (res.status === 200) {

        dispatch(rescuerregister(rescuerdata))
        Navigate("/Rescuer/RescuerOtp");
        toast.success("Otp Sent Successfully");
        console.log("Otp Sent Successfully");
       
      } else {
        toast.error("Registration Failed. User already exists");
        console.log("Registration Failed");
        
      }
    } catch(error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      toast.error(`Error:, ${error.response ? error.response.data : error.message}`);
      
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={RegisterSubmission} encType="multipart/form-data">
      <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
        <div className="md:w-1/3 max-w-sm">
          <img src={Loginimage} alt="Sample image" />
        </div>
        <div className="md:w-1/3 max-w-sm mt-">
          <div className="my-5 flex items-center before:mt-0.5 before:flex-1after:mt-0.5 after:flex-1">
            <p className="mx-4 mb-0 text-center font-semibold text-blue-600 hover:text-blue-400">
              Please Enter Your Details
            </p>
          </div>
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="text"
            placeholder="Mobile Number"
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
          <label htmlFor="fileInput" className="block text-sm font-medium text-gray-700">
            Upload The Certificate
          </label>
          <input
            id="fileInput"
            type="file"
            onChange={(e) => imageHandler(e)}
            className="mt-1 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
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
              Register
            </button>
          </div>
          <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
            Have an account?{" "}
            <a
              className="text-red-600 hover:underline hover:underline-offset-4"
              href="#"
            >
           <Link to="/Rescuer/Login">Login</Link>
            </a>
          </div>
          <GoogleOAuthProvider clientId="119522868035-tfbaa6lr3a8ue1sd8iqdhh119n7mj5g3.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={async(credentialResponse) => {
                  const decoded = jwtDecode(credentialResponse.credential);
                  console.log(decoded);

                  const res=await axios.post("http://localhost:3000/rescuer/rescuergooglelogin",decoded)
                if(!res.ok){
                  toast.success(" Google Login Successed")
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

export default RescuerRegistrationPage;

