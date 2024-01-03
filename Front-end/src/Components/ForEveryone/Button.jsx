import React from "react";
import { useNavigate } from "react-router-dom";

const Button = (props) => {
  const navigate=useNavigate()
  return (
    <div>
      <button onClick={()=>{navigate("/Users/Contact")}} className=" bg-white py-2 px-5 rounded-full mt-4 outline hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:bg-brightGreen hover:text-blue-500 transition-all">
        {props.title} 
      </button>
    </div>
  );
};

export default Button;