import React from 'react'
import { useState } from 'react';
import {toast } from 'react-toastify'
import { FETCH_BASE_URL } from '../../Config/fetchConfig';
import { useNavigate } from 'react-router-dom';

function addStore() {
 const [district,setDistrict]=useState("")
 const [image,setImage]=useState("")
 const [address,setAddress]=useState("")
 const [mobile,setMobile]=useState("")
 const Navigate=useNavigate()
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
    setImage(selectedFile);
  }

  const handleaddstore = async (event) => {
    event.preventDefault();
    if (!district.trim()) {
      toast.error('Please enter a valid District');
      return;
    }
    if (!/^[0-9]{10}$/.test(mobile.trim())) {
      toast.error('Please enter a valid mobile number');
      return;
    }
    
    if (!address.trim()) {
      toast.error('Please enter a valid  address');
      return;
    }
    if(!image){
      toast.error("Please Upload Store Image")
    }

    
    const formdatatosend=new FormData()
    formdatatosend.append("district",district)
    formdatatosend.append("image",image)
    formdatatosend.append("address",address)
    formdatatosend.append("mobile",mobile)
    try {
      const res = await fetch(`${FETCH_BASE_URL}/admin/Addstore`, {
        method: "post",
        body: formdatatosend
      });
      const result=await res.json()
      console.log(result)
    
      if (res.ok) {
        toast.success("Store added successfully")
        Navigate("/Admin/Liststore")
      }else {
        toast.error(result); 
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error("An error occurred:", error);
    }
  };
  

    return (
    
        <form onSubmit={handleaddstore} >
        <section className=" h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0 ima bg-slate-400">
          {/* <div className="md:w-1/3 max-w-sm">
            <img
              src={Loginimage}
              alt="Sample image"
            />
          </div > */}
          <div className="md:w-1/3 max-w-sm mt_4">
            <div className="text-center md:text-left">
              <label className="mr-1">Add the store Details</label>
            </div>
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
              type="text"
              placeholder="Enter The District Name"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            />
              <label htmlFor="fileInput" className="block text-sm font-medium text-gray-700">Store image</label>
        <input
           id="fileInput"
            type="file"
           onChange={(e) => imageHandler(e)}
            className="mt-1 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
         />

            
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
              type="text"
              placeholder="Enter the Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
             <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
              type="text"
              placeholder="Enter the mobile number"
              value={mobile}
              onChange={(e)=>setMobile(e.target.value)}
            />
            <div className="text-center md:text-left">
              <button
                className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                type="submit"
              >
                Add Store
              </button>
            </div>
    
          </div>
        </section>
        </form>
      
      );
}

export default addStore
