import asyncHandler from "express-async-handler"
import generateToken from "../Tokens/RescuerToken.js";
import Rescuer from "../Models/RescuerModel.js";
import Report from "../Models/ReportModel.js";
import bcrypt from "bcrypt"
import nodemailer from "nodemailer"
import otpGenerator from "otp-generator"
import Addstore from "../Models/Addstoremodel.js";
import { cloudinary } from "../Config/cloudinary.js";
import dotenv from "dotenv"
import User from "../Models/UserModel.js";
dotenv.config();
import crypto from "crypto"
const nodemailerHost = process.env.NODE_MAILER_HOST
const nodemailerUser = process.env.NODE_MAILER_USER
const nodemailerPass = process.env.NODE_MAILER_PASS
const nodemailerPort = process.env.NODE_MAILER_PORT
const nodemailerfrom = process.env.NODE_MAILER_FROM


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

  return otpGenerator.generate(length, Options);
}

const transporter = nodemailer.createTransport({
  host: nodemailerHost,
  port: nodemailerPort,
  secure: true,
  auth: {
    user: nodemailerUser,
    pass: nodemailerPass,
  },
});



const Registerrescuer = asyncHandler(async (req, res) => {
  const resuerdata = req.body
  const email = req.body.email
  const image = req.file.filename

  try {
    const rescuerExists = await Rescuer.findOne({ email: email });

    if (rescuerExists) {
      throw new Error("Rescuer Already Exists")
    } else {
      const Userotp = generateOTP(6);
      const mailOptions = {
        from: nodemailerfrom,
        to: email,
        subject: "Registration Confirmation",
        text: `Thank you for your Time. Your OTP is:${Userotp}`,
      };

      await transporter.sendMail(mailOptions);
      console.log("otp send successfully")
      res.status(200).json({
        image,
        resuerdata,
        Userotp
      })
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
})

const RescuerOtpconfirmation = asyncHandler(async (req, res) => {
  try {
    const otpCode = req.body.otp
    const image = req.body.rescuer.image
    const actualotp = req.body.rescuer.Userotp
    const rescuerData = req.body.rescuer.resuerdata


    const { name, mobile, email, password } = rescuerData

    if (otpCode == actualotp) {
      const rescuer = await Rescuer.create({
        name,
        mobile,
        email,
        Certificate: image,
        password,

      });
      if (rescuer) {
        res.status(201).json("Registation Completed");
      } else {
        throw new Error("Registation Failed")
      }
    } else {
      throw new Error("Invalid OTP")

    }
  } catch (error) {
    res.status(401).json(error.message);
  }

})
const Rescuerlogin = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body)
    console.log("hai")

    const rescuer = await Rescuer.findOne({ email });
    console.log(rescuer)
    if (rescuer && (await rescuer.matchPassword(password))) {
      generateToken(res, rescuer);
      res.status(201).json({
        _id: rescuer._id,
        name: rescuer.name,
        email: rescuer.email,
      });
    } else {
      throw new Error("Invalid Email or Password");
    }
  } catch (error) {
    res.status(401).json(error.message)
  }
});
const googleauth = asyncHandler(async (req, res) => {
  try {
    const email = req.body.email
    const name = req.body.name
    console.log(name)
    const rescuerdata = await Rescuer.findOne({ email: email })
    if (rescuerdata) {
      generateToken(res, rescuerdata._id);
      res.status(201).json({
        name: name,
        email: email
      })
    } else {
      const generator = generateRandomString(8)
      
      const newrescuer = await Rescuer.create({
        name,
        email,
        googleLogin: true,
        password:generator

      })
      const mailOptions = {
        from: nodemailerfrom,
        to: email,
        subject: "Registration Confirmation",
        text: `Thank you for your Time. Your OTP is:${generator}`,
      };

      await transporter.sendMail(mailOptions);
      console.log("otp send successfully")
      generateToken(res, newrescuer.email);
      res.status(201).json({
        name: name,
        email: email
      })

    }
  } catch (error) {
    res.status(401)
  }
})
const rescuerlogout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Log out successfully" });

});
const Forgotpassword = asyncHandler(async (req, res) => {
  const actualdata = req.body
  const { email, password, mobile } = req.body
  try {
    const rescuer = await Rescuer.findOne({ email: email })
    if (rescuer) {
      const Userotp = generateOTP(6);
      console.log(Userotp)
      const mailOptions = {
        from: nodemailerfrom,
        to: email,
        subject: "Registration Confirmation",
        text: `Thank you for your Time. Your OTP is:${Userotp} Thanku CARE THE BEST TEAM`,
      }
      res.status(201).json({
        actualdata,
        Userotp
      })
    } else {
      res.status(401).json("No Rescuer Found")
    }
  } catch (error) {
    res.status(401).json("Password Updation is not completed")
  }
})
const verifyforgotpasswordOTP = asyncHandler(async (req, res) => {
  try {
    console.log(req.body)
    const email = req.body.rescuer.actualdata.email
    const otp = req.body.otp
    const actualotp = req.body.rescuer.Userotp
    const password = req.body.rescuer.actualdata.password
    const otpCode = req.body.otp
    if (actualotp == otp) {
      const hashedPassword = await hashPassword(password);
      console.log(hashedPassword)
      const rescuer = await Rescuer.updateOne({ email: email }, { $set: { password: hashedPassword } })
      res.status(201).json("Password Updated Successfully")
    } else {
      res.status(401).json("Invalid OTP")
    }
  } catch (error) {
    res.status(401).json("Otp validation Failed")
  }
})
const forgotpasswordResendOTP = asyncHandler(async (req, res) => {
  try {

    const email = req.body.rescuer.actualdata.email
    const Userotp = generateOTP(6);
    console.log(Userotp)
    const mailOptions = {
      from: nodemailerfrom,
      to: email,
      subject: "Registration Confirmation",
      text: `Thank you for your Time. Your OTP is:${Userotp} Thanku CARE THE BEST TEAM`,
    };

    await transporter.sendMail(mailOptions);
    console.log("otp send successfully")

    res.status(201).json({ otp: Userotp })
  } catch (error) {
    res.status(401).json("OIP is not Sented")
  }


})
const resendOtp = asyncHandler(async (req, res) => {
  try {
    console.log(req.body)
    const { email } = req.body
    console.log(email)
    const Userotp = generateOTP(6);
    console.log(Userotp)
    const mailOptions = {
      from: nodemailerfrom,
      to: email,
      subject: "Registration Confirmation",
      text: `Thank you for your Time. Your OTP is:${Userotp} Thanku CARE THE BEST TEAM`,
    };

    await transporter.sendMail(mailOptions);
    console.log("otp send successfully")

    res.status(201).json(Userotp)
  } catch (error) {
    res.status(401).json("OIP is not Sented")
  }

})
const updateprofile = asyncHandler(async (req, res) => {

  try {
    const updateFields = {};
    if (req.body.name) updateFields.name = req.body.name;
    if (req.body.email) updateFields.email = req.body.email;
    if (req.body.district) updateFields.district = req.body.district

    if (req.file) {
      const imageUrl = req.file.filename;
      updateFields.profileImage = imageUrl;
    }

    const query = { email: req.body.email }; // Assuming email is the unique identifier
    const update = await Rescuer.findOneAndUpdate(query, updateFields, { new: true });

    if (update) {
      res.status(201).json({ update });
    } else {
      res.status(401).json({ error: 'Update failed' });
    }

  } catch (error) {
    res.status(401)
  }


})
const displayRescuer = asyncHandler(async (req, res) => {

  const { email } = req.body
  const rescuerdata = await Rescuer.findOne({ email: email })

  console.log(rescuerdata)
  if (rescuerdata) {
    res.status(201).json({ rescuerdata })
  } else {
    res.status(401)
  }

})

const Rescuedetails = asyncHandler(async (req, res) => {

  try {
    const { district, image, certificate, animal, vaccination, date, email } = req.body

    const result = await cloudinary.uploader.upload(image, {
      folder: "Public"
    })
    const result1 = await cloudinary.uploader.upload(certificate, {
      folder: "Public"
    })

    const rescueReport = await Report.create({
      district,
      animal,
      vaccination,
      date,
      email,
      image: {
        public_id: result.public_id,
        url: result.secure_url
      },
      certificate: {
        public_id: result1.public_id,
        url: result1.secure_url
      }

    })
    if (rescueReport) {

      res.status(201).json("Rescue Details Added Successfully");

    } else {
      res.status(401).json("Rescue updation Failed")
    }

  } catch (error) {
    res.status(401).json("Rescue updation Failed")

  }

})
const displayAnimaldetails = asyncHandler(async (req, res) => {
  try {
    const email = req.body.email
    const animaldata = await Report.find({ email: email ,approve:true})
   
    if (animaldata) {
      res.status(201).json({ animaldata })
    } else {
      res.status(401)
    }

  } catch (error) {
    res.status(401)
  }

}
)
const displaydistrict = asyncHandler(async (req, res) => {
  try {
    const districtdata = await Addstore.find({})

    res.status(201).json(districtdata)

  } catch (error) {
    res.status(401).json("Invalid district data")

  }

})
const followlist = asyncHandler(async (req, res) => {
  try {
    const email = req.body.email;
    const actualdata = [];

    const rescuerData = await Rescuer.findOne({ email: email });

    if (rescuerData) {

      const followerEmails = rescuerData.follower || [];


      await Promise.all(
        followerEmails.map(async (item) => {
          const userdata = await User.findOne({ email: item });
          actualdata.push(userdata);
        })
      );
      console.log(actualdata)
      res.status(200).json(actualdata);
    } else {
      console.log('No Rescuer found for the specified email.');
      res.status(404).json({ error: 'Rescuer not found' });
    }
  } catch (error) {
    console.error('Error finding Rescuer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
const checkBlocked =asyncHandler(async(req,res)=>{
  try{
    
    const email=req.body.email
    console.log(email)
    const rescuerdata=await Rescuer.findOne({email:email})
    console.log(rescuerdata)
    res.status(201).json(rescuerdata)

  }catch(error){
    res.status(401).json("No data is available")
  }
 })
 


export {
  Registerrescuer,
  Rescuerlogin,
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
  displaydistrict, followlist,
  checkBlocked
}