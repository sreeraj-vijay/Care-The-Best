import express from "express"

import { Rescuerlogin,
    Registerrescuer,
    RescuerOtpconfirmation,
    googleauth,
    rescuerlogout,
    Forgotpassword,
    verifyforgotpasswordOTP,
    forgotpasswordResendOTP,
    resendOtp,
    updateprofile,
    displayRescuer,
    Rescuedetails,
    displayAnimaldetails,
    displaydistrict,
    followlist,
    checkBlocked} from "../Controllers/RescuerController.js";

import {uploadImage } from "../Config/multer.js";
import { approvalorblockcheck } from "../Middleware/RescuerMiddleware.js";
import { chatrescuerDetails,rescuerSendMessage,chatedUser,rescuerdisplayMessages} from "../Controllers/ChatController.js";
const rescuerRoute=express.Router();
rescuerRoute.post("/RescuerOtp",uploadImage.single("Certificate"),Registerrescuer)
rescuerRoute.post("/Rescuerlogin",approvalorblockcheck,Rescuerlogin)
rescuerRoute.post("/RegisterRescuer",RescuerOtpconfirmation)
rescuerRoute.post("/rescuergooglelogin",googleauth)
rescuerRoute.get("/Rescuerlogout",rescuerlogout)
rescuerRoute.post("/Forgotpassword",Forgotpassword)
rescuerRoute.put("/ForgotpasswordOtp",verifyforgotpasswordOTP)
rescuerRoute.post("/forgotpasswordResendOTP",forgotpasswordResendOTP)
rescuerRoute.post("/RescuerResendOTP",resendOtp)
rescuerRoute.post("/UpdateProfile",uploadImage.single("profileImage"),updateprofile)
rescuerRoute.post("/rescuerDetails",displayRescuer)
rescuerRoute.post("/RescueDetails",Rescuedetails)
rescuerRoute.post("/Animaldetails",displayAnimaldetails)
rescuerRoute.get("/districtdata",displaydistrict)
rescuerRoute.post("/chatrescuerdetails",chatrescuerDetails)
rescuerRoute.post("/RescuersendMessage",rescuerSendMessage)
rescuerRoute.post("/chathistory",chatedUser)
rescuerRoute.post("/displayMessages",rescuerdisplayMessages)
rescuerRoute.post("/Followerlist",followlist)
rescuerRoute.post("/checkBlocked",checkBlocked)


export default rescuerRoute