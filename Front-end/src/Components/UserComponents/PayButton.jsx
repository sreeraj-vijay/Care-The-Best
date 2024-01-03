import React from 'react'
import { axiospath } from '../../Config/axiosConfig'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2';

function PayButton(props) {
  
  const showAlert = (id) => {
    Swal.fire({
      title: "Are You Sure?",
      showCancelButton: true, // Display the cancel button
      confirmButtonText: "Okay",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        handleCheckout()
      } else {
        // Handle the cancel button click (optional)
        console.log("Operation canceled");
      }
    });
  };
    const handleCheckout=async()=>{
        const animal_id=props.id
       const animalid=localStorage.setItem("animalid",animal_id)
       const useremail=localStorage.getItem("useremail")
       const res=axiospath.post("/stripe/create-checkout-session",{
        useremail:useremail,
        animal_id:animal_id    
       })
       .then((res)=>{
        if(res.data.url){
            window.location.href=res.data.url
        }

       })
       .catch((err)=>{
        toast.error(err.message)
        console.log(err.message)
       })      
     }

  return (
    <div className='mt-4'>
        <button className='cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
    border-blue-600
    border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
    active:border-b-[2px] active:brightness-90 active:translate-y-[2px]'style={{ minWidth: '120px', height: '40px' }} 
    onClick={ showAlert}>Adopt</button>
      
    </div>
  )
}

export default PayButton
