import express from "express"
const adminRoute=express.Router();
import { Registeradmin,
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
    Listanimals,animalApprovalstatus,
    adoptionDetails,graphdata,aditionalGraphdata} from "../Controllers/AdminController.js";

import { uploadImage } from "../Config/multer.js";
adminRoute.post("/Register",Registeradmin)
adminRoute.post("/adminlogin",adminlogin)
adminRoute.post("/addStore",uploadImage.single("image"),addStore)
adminRoute.get('/Userdetails',userlist)
adminRoute.post('/Blockuser', blockuser)
adminRoute.get("/ListStore",Liststore)
adminRoute.get("/Detailsofupdatestore",Listupdatestore)
adminRoute.put("/Updatestore",uploadImage.single("image"),updatestore)
adminRoute.get("/RescuerDetails",ListRescuer)
adminRoute.put("/BlockRescuer",blockrescuer)
adminRoute.put("/ApproveRescuer",approverescuer)
adminRoute.get("/adminlogout",adminlogout)
adminRoute.get('/ListRescuedAnimals',Listanimals)
adminRoute.post("/rescuerApproval",animalApprovalstatus)
adminRoute.get("/adoptedDetails",adoptionDetails)
adminRoute.post("/graphdata",graphdata)
adminRoute.post("/graphaditionaldata",aditionalGraphdata)

export default adminRoute