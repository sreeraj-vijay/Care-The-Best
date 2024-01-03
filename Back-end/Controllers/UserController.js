import asyncHandler from "express-async-handler"
import User from "../Models/UserModel.js"
import Rescuer from "../Models/RescuerModel.js";
import generateToken from "../Tokens/UserToken.js";
import Addstore from "../Models/Addstoremodel.js";
import bcrypt from "bcrypt"
import Report from "../Models/ReportModel.js";
import nodemailer from "nodemailer"
import otpGenerator from "otp-generator"
import dotenv from "dotenv"
import crypto from "crypto"
dotenv.config();
const nodemailerHost=process.env.NODE_MAILER_HOST
const nodemailerUser=process.env.NODE_MAILER_USER
const nodemailerPass=process.env.NODE_MAILER_PASS
const nodemailerPort=process.env.NODE_MAILER_PORT
const nodemailerfrom=process.env.NODE_MAILER_FROM

// Random password genetater
function generateRandomString(length) {
  const randomBytes = crypto.randomBytes(Math.ceil(length / 2));
  return randomBytes.toString('hex').slice(0, length);
}

async function hashPassword(password) {
  try {
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  } catch (error) {
    throw error;
  }
}
function generateOTP(length) {
  const Options = {
    digits: true,
  };
  return otpGenerator.generate(length,Options );
}

const transporter = nodemailer.createTransport({
  host:nodemailerHost,
  port:nodemailerPort,
  secure: true,
  auth: {
    user: nodemailerUser,
    pass: nodemailerPass,
  },
});

const Registeruser= async (req, res) => {
  console.log(req.body)
  const { name, email, password, mobile } = req.body

  try {
    const user = await User.findOne({email:email})

    console.log(user);

    if (! user) {
     const Userotp=await generateOTP(6)
      const mailOptions = {
        from:nodemailerfrom,
        to: email,
        subject: "Registration Confirmation",
        text: `Thank you for registering on your website. Your OTP is:${Userotp}`,
      };

      await transporter.sendMail(mailOptions);
      console.log("otp send successfully")
      res.status(201).json({
      name:name,
      email:email,
      password:password,
      mobile:mobile,
      otp:Userotp
  })
    } else {
      res.status(400).json({ error: "User is already exists" });
    }
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const Registeruserconfirmation =asyncHandler(async(req,res)=>{
  try{
  const otpCode=req.body.otp
  const {name,email,password,mobile,otp}=req.body.user  
  if(otp == otpCode){
    const user = await User.create({
      name,
      email,
      password,
      mobile
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile:user.mobile
      });
    } else {
      throw new Error("invalid user data");
    }
  }else{
    throw new Error("Invalid OTP")
  }
}catch(error){
  console.log(error.message)
  res.status(401).json(error.message);
}
})
const userlogin=asyncHandler(async(req,res)=>{
  try{
  
   const { email, password } = req.body;

   const user = await User.findOne({ email });
  console.log(user)
     
  if (user) {
   
    if(user &&  (await user.matchPassword(password))){
     generateToken(res, user._id);
     res.status(201).json(
     user
     );
   } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
       }
   }
  }
    catch(error){
    
     res.status(401).json("Invalid Email or Password")

     }
     });

const userlogout  =asyncHandler(async(req,res)=>{
      res.cookie("jwtuser", "", {
      httpOnly: true,
      expires: new Date(0),
    });
   
    res.status(200).json({ message: "Logged out successfully" });
    
  });
const googleauth=asyncHandler(async(req,res)=>{
  try{
    const email=req.body.email
    const name=req.body.name
    console.log(name)
    const userdata=await User.findOne({email:email})
    if(userdata){ 
      generateToken(res, userdata._id);
      res.status(201).json({name:name,
      email:email})
    }else{
      const generator = generateRandomString(8)
      console.log(generator)
      const newuser =await User.create({
        name,
        email,
        googleLogin:true,
        password:generator,

      })
      
      generateToken(res, newuser.name);
      const mailOptions = {
        from:nodemailerfrom,
        to: email,
        subject: "Registration Confirmation",
        text: `Thank you for registering on your website. Your Password is :${generator}`,
      };

      await transporter.sendMail(mailOptions);
      res.status(201).json({name:name,
      email:email})     
  }
  }catch(error){
    res.status(401)
  }
})
const storelist=asyncHandler(async(req,res)=>{
  try{
   
    console.log(req.query.search)
    console.log(req.query.page)
    var values=""
    if(req.query.search==undefined){

    values=await Addstore.find({})
  
    }else{

    values=await Addstore.find({ district: { $regex: req.query.search, $options: 'i' } })
    }

    if(values){
    const itemsperpage=3
    const page=parseInt(req.query.page)
    const startIndex=(page-1) * itemsperpage
    const endIndex=startIndex + itemsperpage
    const pageperitem=values.slice(startIndex,endIndex)
    
      res.status(201).json({data:pageperitem,
      totalpage:Math.ceil(values.length / itemsperpage)})
    }else{
      res.status(401)
    }
  }catch(error){
    res.status(401)
  }
})
const Forgotpassword=asyncHandler(async(req,res)=>{
 
  const{email,password,mobile}=req.body
  const userdata=req.body
  try{
    const user=await User.findOne({email:email})
    console.log(user)
    if(user){
      const Userotp=await generateOTP(6)
      const mailOptions = {
        from:nodemailerfrom,
        to: email,
        subject: "Registration Confirmation",
        text: `Thank you for registering on website. Your OTP is:${Userotp}`,
      };

      await transporter.sendMail(mailOptions);
      console.log("otp send successfully")
     console.log(Userotp)
      res.status(201).json({
        userdata,
        Userotp
    })
    }else{
      res.status(401).json("Password Updation Failed")
    }
  }catch(error){
    res.status(401).json("Password Updation Failed nnnn")
  }
})
const verifyforgotpasswordOTP=asyncHandler(async(req,res)=>{
  try{
console.log(req.body)
    const data = req.body
    const {email,password}=data.user.userdata
    console.log(password)
    const actualotp=data.user.Userotp
    const otpCode=req.body.otp
    console.log(password,email,actualotp,otpCode)
  
    if(actualotp == otpCode ){
   
    console.log(otpCode)
    console.log(email)
    console.log(password)
    const hashedPassword = await hashPassword(password);
    console.log(hashedPassword)
    const user=await User.updateOne({email:email},{$set:{password:hashedPassword}})
    console.log(user)
    res.status(201).json({data})
    }else{
      res.status(401).json("Invalid Otp")
    }
  }catch(error){
    res.status(401).json(error)
  }
})
const resendOtp=asyncHandler(async(req,res)=>{
  try{
    console.log(req.body)
    const newemail=req.body.email
    console.log(newemail)
     
   const ResentUserotp=await generateOTP(6)
    const mailOptions = {
         from: nodemailerfrom,
         to: newemail,
         subject: "Registration Confirmation",
         text: `Thank you for registering on your website. Your OTP is:${ResentUserotp}`,
       };
 
  await transporter.sendMail(mailOptions);
  console.log("otp send successfully")
 res.status(201).json(ResentUserotp)
  }catch(error){
   res.status(401).json("Resend OTP Failed")
  }

})
const forgotpasswordResendOTP=asyncHandler(async(req,res)=>{
  try{
    const data = req.body.user
    const {email}=data.user
    const Userotp=await generateOTP(6)
    const mailOptions = {
      from: nodemailerfrom,
      to: email,
      subject: "Registration Confirmation",
      text: `Thank you for registering on your website. Your OTP is:${Userotp}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("otp send successfully")
   console.log(Userotp)
   res.status(201).json(Userotp)

  }catch(error){
    res.status(401).json("Otp is Not Sented")
  }

})
const displayanimalsinthesotore=asyncHandler(async(req,res)=>{
  console.log(req.body)
  const district=req.body.district
  try{
    const animaldata = await Report.find(
      { district:district, approve: true,adopted:false }
    );
    
    if(animaldata){
      console.log(animaldata)
      res.status(201).json(
        animaldata
      )
    }else{
      res.status(401)
    }

  }catch(error){
    res.status(401)
  }

})
const displayUserdata=asyncHandler(async(req,res)=>{
  const email=req.body.email
  try{
    const userdata=await User.find({email:email})
    
    if(userdata){
      res.status(201).json({userdata})
    }else{
      res.status(401)
    }
  }catch(error){
    res.status(401)

  }

})

const updateprofile=asyncHandler(async(req,res)=>{
   
  try{   
   const updateFields = {};
   if (req.body.name) updateFields.name = req.body.name;
   if (req.body.mobile) updateFields.mobile = req.body.mobile;
   if (req.body.email) updateFields.email = req.body.email;
  
   
   if (req.file) {
       const imageUrl = req.file.filename;
       updateFields.profileImageName = imageUrl;
       const updateimage =await User.findOneAndUpdate({email:req.body.email},{$set:{profileImageName:imageUrl}})
       console.log(updateimage)
   }
   
   const query = { email: req.body.email }; 
   console.log(query)
   const userdata = await User.findOneAndUpdate(query, updateFields, { new: true });
   
   if (userdata) {
       res.status(201).json({ userdata });
   } else {
       res.status(401).json({ error: 'Update failed' });
   }
   
  }catch(error){
   res.status(401)
  }
 

 })
 const DisplayRescuer=asyncHandler(async(req,res)=>{
  try{
    const rescuer=await Rescuer.find({})
    if(rescuer){
      res.status(201).json({rescuer})
    }else{
      res.status(401)
    }

  }catch(error){
    res.status(401)
  }

 })

 const animalAdopteddata=asyncHandler(async(req,res)=>{
  try{
    const email=req.body.email
    const AdoptedData=await Report.find({email:email,adopted:true})
    console.log(AdoptedData)
    if(AdoptedData){
      res.status(201).json(AdoptedData)
    }else{
      res.status(401).json("No data avialable")
    }
    
  }catch(error){
    res.status(401).json("No animal Adopted")
  }

 })
 const animalRescueddata=asyncHandler(async(req,res)=>{
  try{
    const email=req.body.email
    const AdoptedData=await Report.find({email:email})
    console.log(AdoptedData)
    if(AdoptedData){
      res.status(201).json(AdoptedData)
    }else{
      res.status(401).json("No data avialable")
    }
    
  }catch(error){
    res.status(401).json("No animal Adopted")
  }

 })
 const followRequest =asyncHandler(async(req,res)=>{
  try{
    console.log("hai")
    console.log(req.body)
    const id=req.body.rescuerid
    const useremail=req.body.email

    const rescuerdata=await Rescuer.findOne({_id:id})
    if(rescuerdata){
      const updatedata=await Rescuer.findOneAndUpdate({_id:id},{$push:{follower:useremail}})
      res.status(201).json(rescuerdata)
    }else{
    
    res.status(401).json("No data is Available")
    }

  }catch(error){
    res.status(401).json(error)
  }
 })
 const followlist =asyncHandler(async(req,res)=>{
  try{
    const email=req.body.email
    console.log(email)
    const rescuerData = await Rescuer.find({ follower: { $in: [email] } });
    console.log(rescuerData)
    res.status(201).json(rescuerData)

  }catch(error){
    res.status(401).json(error)
  }
 })
 const unFollowRequest =asyncHandler(async(req,res)=>{
  try{
 
    const id=req.body.rescuerid
    const useremail=req.body.email

    const rescuerdata=await Rescuer.findOne({_id:id})
    if(rescuerdata){
      const updatedata=await Rescuer.findOneAndUpdate({_id:id},{$pull:{follower:useremail}})
      res.status(201).json(rescuerdata)
    }else{
    
    res.status(401).json("No data is Available")
    }

  }catch(error){
    res.status(401).json(error)
  }
 })
 const checkBlocked =asyncHandler(async(req,res)=>{
  try{
    const email=req.body.email
    const userdata=await User.findOne({email:email})
    console.log(userdata)
    res.status(201).json(userdata)

  }catch(error){
    res.status(401).json("No data is available")
  }
 })
 
export {
    Registeruser,
    userlogin,
    userlogout,
    Registeruserconfirmation,
    googleauth,
    storelist,
    verifyforgotpasswordOTP,
    Forgotpassword,
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
    checkBlocked
    
    
}