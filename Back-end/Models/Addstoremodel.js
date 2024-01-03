import mongoose from "mongoose";
const addstoreSchema = mongoose.Schema(
  {
    district:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    mobile: {
      type: String,
      required: true,
    },   
  },
  {
    timestamps: true,
  }
);


const Addstore = mongoose.model("Addstore", addstoreSchema);
export default Addstore;