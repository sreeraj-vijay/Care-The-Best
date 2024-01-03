import asyncHandler from "express-async-handler"
import Admin from "../Models/AdminModel.js"
import Addstore from "../Models/Addstoremodel.js";
import generateToken from "../Tokens/AdminToken.js";
import User from "../Models/UserModel.js";
import Rescuer from "../Models/RescuerModel.js";
import Report from "../Models/ReportModel.js";
import Payment from "../Models/PaymentModel.js";
const Registeradmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const adminExists = await Admin.findOne({ email });

  if (adminExists) {
    res.status(400);
    throw new Error("Admin already exist");
  } else {
    const admin = await Admin.create({

      email,
      password,

    });
    if (admin) {
      generateToken(res, admin._id);
      res.status(201).json({
        _id: admin._id,
        email: admin.email,
      });
    } else {
      res.status(400);
      throw new Error("invalid admin data");
    }
  }


})
const adminlogin = asyncHandler(async (req, res) => {

  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (admin && (await admin.matchPassword(password))) {
    generateToken(res, admin._id);
    res.status(201).json({
      _id: admin._id,
      email: admin.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const addStore = asyncHandler(async (req, res) => {
  try {
    const { district, address, mobile } = req.body

    const existing = await Addstore.findOne({ district: { $regex: `^${district}$`, $options: 'u' } });

    if (existing) {
      res.status(401).json("Store already exist");
    } else {
      const addnewstore = await Addstore.create({
        district,
        address,
        mobile,
        image: req.file.filename
      })
      res.status(201).json("Store Updated Successfully")
    }
  } catch (error) {
    res.status(401).json("Store updation Failed");
  }
})

const userlist = asyncHandler(async (req, res) => {
  const userdata = await User.find({})
  if (userdata) {
    res.status(201).json({
      userdata
    })
  } else {
    res.status(401)
    throw new Error("No data present")
  }
})
const blockuser = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.body
    const user = await User.findOne({ _id: userId })

    if (user.isListed === false) {
      await User.findOneAndUpdate({ _id: user._id }, { $set: { isListed: true } })
    } else {
      await User.findOneAndUpdate({ _id: user._id }, { $set: { isListed: false } })
    }
    res.status(201).json({
      user
    })
  } catch (error) {
    res.status(401)
    throw new Error("Updation  not completed")
  }
})
const Liststore = asyncHandler(async (req, res) => {
  try {
    const Storedata = await Addstore.find({})
    if (Storedata) {
      res.status(201).json({
        Storedata
      })
    } else {
      res.status(401)
    }
  } catch (error) {
    console.log("Store Data does not Exists")
  }

})
const Listanimals = asyncHandler(async (req, res) => {
  try {
    const animaldata = await Report.find({})
    if (animaldata) {
      res.status(201).json({
        animaldata
      })
    } else {
      res.status(401)
    }
  } catch (error) {
    console.log("Animal Data does not Exists")
  }

})
const Listupdatestore = asyncHandler(async (req, res) => {
  const storeid = req.query.id
  try {
    const store = await Addstore.findOne({ _id: storeid })
    if (store) {
      res.status(201).json({
        store
      })
    } else {
      res.status(401)
    }
  } catch (error) {
    res.status(401)
    throw new Error("store does not exists")
  }
})
const updatestore = asyncHandler(async (req, res) => {
  const storeId = req.query.id;
  const updateFields = {};
  if (req.body.address) updateFields.address = req.body.address;
  if (req.body.mobile) updateFields.mobile = req.body.mobile;
  if (req.file) {
    const imageUrl = req.file.filename
    updateFields.image = imageUrl;
  }
  const update = await Addstore.findByIdAndUpdate(storeId, updateFields, { new: true });
  if (update) {
    res.status(201).json(
      {
        update
      }
    )
  }
  else {
    res.status(401)
    console.log("Updation failed")
  }
})
const ListRescuer = asyncHandler(async (req, res) => {
  try {
    const Rescuerdata = await Rescuer.find({})
    if (Rescuerdata) {
      res.status(201).json({
        Rescuerdata
      })
    } else {
      res.status(401)
    }
  } catch (error) {
    console.log("Rescuer Data does not Exists")
  }

})
const blockrescuer = asyncHandler(async (req, res) => {
  try {
    console.log(req.body)
    const { rescuerId } = req.body
    const rescuer = await Rescuer.findOne({ _id: rescuerId })
    if (rescuer.isListed === true) {
      const rescuerdata = await Rescuer.findOneAndUpdate({ _id: rescuerId }, { $set: { isListed: false } })
      res.status(201).json({
        rescuer
      })

    } else {
      const rescuerdata = await Rescuer.findOneAndUpdate({ _id: rescuerId }, { $set: { isListed: true } })
      res.status(201).json({
        rescuer
      })
    }


  } catch (error) {
    res.status(401)
    throw new Error("Updation  not completed")
  }
})
const approverescuer = asyncHandler(async (req, res) => {
  try {
    const { rescuerId } = req.body
    const rescuer = await Rescuer.findOne({ _id: rescuerId })
    if (rescuer.approve === false) {
      const rescuerdata = await Rescuer.findOneAndUpdate({ _id: rescuerId }, { $set: { approve: true } })
      res.status(201).json({
        rescuer
      })
    }


  } catch (error) {
    res.status(401)
    throw new Error("Approval  not completed")
  }
})
const animalApprovalstatus = asyncHandler(async (req, res) => {
  try {

    const animalId = req.body.id
    const animal = await Report.findOne({ _id: animalId })
    if (animal.approve === true) {
      const animaldata = await Report.findOneAndUpdate({ _id: animalId }, { $set: { approve: false } })
      res.status(201).json({
        animal
      })

    } else {
      const animaldata = await Report.findOneAndUpdate({ _id: animalId }, { $set: { approve: true } })
      res.status(201).json({
        animal
      })
    }


  } catch (error) {
    res.status(401)
    throw new Error("Approval  not completed")
  }
})
const adminlogout = asyncHandler(async (req, res) => {
  res.cookie("adminjwt", " ", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });

});
const adoptionDetails = asyncHandler(async (req, res) => {
  try {
    const adoptiondetails = await Payment.find({})
    if (adoptionDetails) {
      res.status(201).json(adoptiondetails)
    }

  } catch (error) {
    res.status(401).json("Net Work Error")
  }
})
const graphdata = asyncHandler(async (req, res) => {
  try {
    const start = req.body.start
    const end = req.body.end
    const graph = []
    if (start == null) {
      const adoptiondata = await Report.find({})
      const Rescuerdata = await Payment.find({})
      graph.push(adoptiondata.length)
      graph.push(Rescuerdata.length)
      res.status(201).json(graph)
    } else {
      const adoptiondata = await Report.find({
        createdAt: {
          $gte: start,
          $lte: end
        }
      })
      const Rescuerdata = await Payment.find({
        createdAt: {
          $gte: start,
          $lte: end
        }
      });
      graph.push(adoptiondata.length)
      graph.push(Rescuerdata.length)
      res.status(201).json(graph)
    }

  } catch (error) {
    res.status(401).json("No Data Available")
  }

})
const aditionalGraphdata = asyncHandler(async (req, res) => {
  try {

    const userdata = await User.find({})
    const rescuerdata = await Rescuer.find({})
    const adoptiondata = await Payment.find({})
    const rescuedata = await Report.find({})
    const user = userdata.length
    const rescuer = rescuerdata.length
    const adopted = adoptiondata.length
    const rescued = rescuedata.length
    console.log(user)
    res.status(201).json({ user: user, rescuer: rescuer, adopted: adopted, rescued: rescued })
  } catch (error) {
    console.log(error)
    res.status(401).json("No data is avilable ")

  }
})
export {
  Registeradmin,
  adminlogin,
  addStore,
  userlist,
  blockuser,
  Liststore,
  Listupdatestore,
  updatestore,
  ListRescuer,
  blockrescuer,
  adminlogout,
  approverescuer,
  Listanimals,
  animalApprovalstatus,
  adoptionDetails,
  graphdata,
  aditionalGraphdata
}