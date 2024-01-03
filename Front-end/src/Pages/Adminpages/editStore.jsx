
import React from 'react'
import { useState,useEffect } from 'react';
import {toast } from 'react-toastify'
import { IMAGE } from '../../../public/projectimages';
import { useNavigate } from 'react-router-dom';
import { axiospath } from '../../Config/axiosConfig'
function editStore() {
 const [data,setData]=useState([])
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
   useEffect(()=>{
    try{
       
        const storedetails=async()=>{
            const stored_id = localStorage.getItem('id');
            const storedata=await axiospath.get("/admin/Detailsofupdatestore", {params: { id: stored_id }})
            setData(storedata.data.store)
        }
        storedetails()

    }catch(error){
        toast.error("No store details available")

    }
    

  },[])
  

  const updatestore = async (event) => {
    event.preventDefault();
    const formdatatosend=new FormData()
    if (district !== "") formdatatosend.append("district", district);
    if (image !== "") formdatatosend.append("image", image);
    if (address !== "") formdatatosend.append("address", address);
    if (mobile !== "") formdatatosend.append("mobile", mobile);
  
    try {
        const storeid = localStorage.getItem('id');
        const storenewdata=await axiospath.put("/admin/Updatestore", formdatatosend, {params: { id: storeid }})
        setData(storenewdata.data.update)
        
      if(storenewdata) {
        Navigate("/Admin/ListStore")
        toast.success("Updated  successfully")
        
      } else {
       toast.error("Store Updation  is not completed")
        console.error("store updating failed");
      }
    } catch (error) {
      toast.error("invalid store data")
      console.error("An error occurred:", error);
    }
  };
  

    return (
       
        <form onSubmit={updatestore} >
        <section className="bg-slate-400 h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0 ima">
          <div className="md:w-1/3 max-w-sm">
            <img
              src={IMAGE+data.image}
              alt="Sample image"
            />
          </div >
          <div className="md:w-1/3 max-w-sm mt_4">
            <div className="text-center md:text-left">
              <label className="mr-1">Add the store Details</label>
            </div>
              <label htmlFor="fileInput" className="block text-xl font-medium text-gray-700">District : {data.district}</label>
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
              placeholder={data.address}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
             <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
              type="text"
              placeholder={data.mobile}
              value={mobile}
              onChange={(e)=>setMobile(e.target.value)}
            />
        
            <div className="text-center md:text-left">
              <button
                className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                type="submit"
              >
                Update Store
              </button>
            </div>
    
          </div>
        </section>
        </form>
      
      );
}

export default  editStore
