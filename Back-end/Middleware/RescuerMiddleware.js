import Rescuer from "../Models/RescuerModel.js"

const approvalorblockcheck=async(req,res,next)=>{
    const email=req.body.email
    const rescuer=await Rescuer.findOne({email:email})
    console.log(rescuer)
  
    
  if(rescuer){
    if(rescuer.approve == false){
    
        res.status(401).json("Approval From Admin is Pending")
        return
    }
    if(rescuer.isListed == true){
        res.status(401).json("Blocked Rescuer")
        return
    }
 }
    next();

 }


 export {
   approvalorblockcheck

 }