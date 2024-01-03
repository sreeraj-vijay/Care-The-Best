import express from "express"
const userRoute = express.Router();
import { Registeruser,
    userlogin,
    userlogout,
    Registeruserconfirmation,
    googleauth,storelist,
    Forgotpassword,
    verifyforgotpasswordOTP,
    resendOtp,
    forgotpasswordResendOTP,
    displayanimalsinthesotore,
    displayUserdata,
    updateprofile,
    DisplayRescuer,
    animalAdopteddata,
    animalRescueddata,
    followRequest,
    followlist,
    unFollowRequest,
    checkBlocked} from "../Controllers/UserController.js";
import { createRoom,chatuserDetails,saveChat,displayMessages,userChatedrescuer} from "../Controllers/ChatController.js";

import { checkblockeduser,tokenAuthentication} from "../Middleware/UserMiddleware.js";
import {uploadImage } from "../Config/multer.js";

userRoute.post("/Registeruser",Registeruserconfirmation)
userRoute.post("/Userlogin",checkblockeduser,userlogin)
userRoute.post("/Otp",Registeruser)
userRoute.get('/Userlogout',userlogout)
userRoute.post('/Usergooglelogin',googleauth)
userRoute.post("/Adopthome",storelist)
userRoute.post("/Forgotpassword",Forgotpassword)
userRoute.put("/ForgotpasswordOtp",verifyforgotpasswordOTP)
userRoute.post("/ResendOTP",resendOtp)
userRoute.post("/forgotpasswordResendOTP",forgotpasswordResendOTP)
userRoute.post("/animaldisplay",displayanimalsinthesotore)
userRoute.post("/Userdetails",displayUserdata)
userRoute.put("/updateuserprofile",uploadImage.single("profileImage"),updateprofile)
userRoute.get("/AvilableRescuers",tokenAuthentication,DisplayRescuer)
userRoute.post("/UserAdopted",tokenAuthentication,animalAdopteddata)
userRoute.post("/UserRescued",tokenAuthentication,animalRescueddata)
userRoute.post("/CreateRoom",createRoom)
userRoute.post("/chatuserdetails",chatuserDetails)
userRoute.post("/sendMessage",saveChat)
userRoute.post("/displayMessages",displayMessages)
userRoute.post("/chathistory",userChatedrescuer)
userRoute.post("/follow",followRequest)
userRoute.post("/Followelist",followlist)
userRoute.post("/unfollow",unFollowRequest)
userRoute.post("/checkBlocked",checkBlocked)


export default userRoute  