import React, { useState } from "react";
import Heading from "./Heading";
import Button from "./Button";
import img from '../../assets/contact1.jpg';
const Contact = () => {
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  return (
    <div className="m-24 min-h-screen flex flex-col items-center justify-center md:mx-32 mx-5 sm:mt-28">
      <Heading title1="Contact" title2="Us" />

      <div className="flex flex-col md:flex-row justify-between w-full mt-8 ">
        <form className="w-full md:w-2/5 space-y-5">
          <div className="flex flex-col">
            <label htmlFor="userName" className="label w-[400px] pt-8">
              Your Name
            </label>
            <input
              className="input-field w-[330px]  md:w-[400px] h-10"
              type="text"
              name="userName"
              value={name}
              placeholder="  Enter your name"
              onChange={(e)=>{setName(e.target.value)}}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="userEmail" className="label">
              Your Email
            </label>
            <input
              className="input-field w-[330px]  md:w-[400px] h-10"
              type="email"
              name="userEmail"
              value={email}
              placeholder="  Enter your email"
              onChange={(e)=>{setEmail(e.target.value)}}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="userNumber" className="label">
              Reason For Contact
            </label>
            <textarea
             rows={5}
              className="input-field w-[330px] md:w-[400px] bg-slate-200"
              type="text"
              name="userNumber"
              id="userNumber"

            />
          </div>

          <div className="flex justify-center">
            <Button title="Send Message" />
          </div>
        </form>

        <div className="w-full h-[300px] md:w-2/4 md:mt-0 mt-14 rounded-xl ">
          <img
            className="object-cover w-[500px] h-[450px] rounded-md"
            src={img}
            alt="img"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
