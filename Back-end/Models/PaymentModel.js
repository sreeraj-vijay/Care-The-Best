import mongoose from "mongoose";
const paymentSchema = mongoose.Schema(
  {
    animaltype: {
      type: String,
    },
    paymentStatus:{
        type:String,
    },
    paymentId:{
        type:String,
    },
    customerEmail:{
        type:String,
    },
},
{
    timestamps: true,
  }
   
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;