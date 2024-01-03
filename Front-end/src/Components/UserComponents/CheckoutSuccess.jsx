import React, { useEffect } from 'react'
import { axiospath } from '../../Config/axiosConfig';
import { toast } from 'react-toastify';
import Loginimage from '../../assets/payment.gif';
function CheckoutSuccess() {
  useEffect(()=>{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");
    console.log(sessionId);
    const sendPaymentData = async () => {
      try {
        const res =await axiospath.post("/stripe/session-status",{id:sessionId})
        const result=await res.data
        localStorage.setItem("paymentDetails", JSON.stringify(result));
       if(result){
        toast.success("Payment Successed")
       }else{
        toast.error("Payment not Completed")
       }
      }catch(error){
        toast.error(error.message)
      }
    }
    const Sotrepaymentdetails=async(req,res)=>{
      try{
        const animalid=localStorage.getItem("animalid")
        const paymentDetails=localStorage.getItem("paymentDetails")
        
        const res=await axiospath.post("/stripe/Storedata",{animalid:animalid,
        paymentDetails})
        const result=await res.data
        if(result){
          toast.success("Payment Completed")
        }else{
          toast.error("Somthing Went Wrong")
        }

      }catch(error){
        toast.error("Something Went wrong")
      }
    }
    sendPaymentData()
    Sotrepaymentdetails()
  },[])
  return (
    <>
    
    <div class="mt-8 md:mt-16 lg:mt-24 bg-green-500">
    <img class="w-full h-auto md:w-full md:h-[450px] lg:w-[900px] mx-auto" src={Loginimage} alt="" />
  </div>
  </>
  )
}

export default CheckoutSuccess
