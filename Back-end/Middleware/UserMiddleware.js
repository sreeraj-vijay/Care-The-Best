import User from "../Models/UserModel.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()


 const checkblockeduser=asyncHandler(async(req,res,next)=>{

    const email=req.body.email
   try{
    const user=await User.findOne({email:email})
if(user){

    if(user.isListed == false){
        res.status(401).json("Blocked User")
    }else{
        next();
    }
}else{
    res.status(402).json("User  Not Found")
}
}catch(error){
    res.status(401).json("User Not Found")

   }

 })

 const tokenAuthentication = asyncHandler(async (req, res, next) => {
    try {
      const token = req.cookies.jwtuser;
  
      if (!token) {
        res.status(401).json({ message: 'Invalid token' });
        return;
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET_USER);
      req.user = await User.findById(decoded.userId).select('-password');
  
      if (req.user.isListed) {
        next();
      } else {
        res.status(401).json({ message: 'Blocked User' });
      }
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  });
  
 
  


 export {
    checkblockeduser,
    tokenAuthentication
    
  
 }