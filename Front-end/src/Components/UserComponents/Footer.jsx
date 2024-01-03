import React from 'react'
import logoImage from '../../assets/logo1.jpg'
import { FaFacebook, FaTwitter, FaInstagram,FaWhatsapp } from 'react-icons/fa';


function Footer() {
  return (
    <div className="mb-0 container mx-auto p-6 bg-white rounded-lg shadow-lg top-56 ">
    <div className="flex flex-col md:flex-row justify-between bg-white  md:px-8 p-6">
      <div className="flex items-center mt-4 md:mt-0 w-full md:w-1/2"> 
        <img className="w-12 h-12 mr-3 " src={logoImage} alt="logo" />
        <h2 className="font-serif text-xl text-darkText cursor-pointer">
          CARE THE BEST
        </h2>
      </div>
  
      <div className="flex flex-col md:flex-row gap-5 font-medium p-1 text-lg w-full md:w-1/2">
        <p className="text-gray-600"> PROVIDING LOVE,CARE AND HOMES FOR ANIMALS.</p>
  
        <div className="flex mt-4 md:mt-0 space-x-4">
          <a href="#" className="text-blue-500 hover:text-blue-700">
            <FaFacebook size={24} />
          </a>
          <a href="#" className="text-blue-400 hover:text-blue-600">
            <FaTwitter size={24} />
          </a>
          <a href="#" className="text-pink-600 hover:text-pink-800">
            <FaInstagram size={24} />
          </a>
          <a href="#" className="text-green-500 hover:text-green-700">
            <FaWhatsapp size={24} />
          </a>
        </div>
      </div>
    </div>
  
    <div className="text-center mt-6">
      <p className="text-gray-500">
        &copy; {new Date().getFullYear()} Developed by{' '}
        <span className="text-brightGreen font-semibold">Care The Best Private Limited</span> | All rights reserved
      </p>
      <p className="text-gray-600 mt-2">
        We sincerely thank you for supporting our mission to care for animals. Together, we make a difference.
      </p>
    </div>
  </div>
  
  )
}

export default Footer
