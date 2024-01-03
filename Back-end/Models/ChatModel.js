import mongoose from "mongoose"

const ChatSchema=mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User' 
   }, // Reference to the User model
   rescuer: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Rescuer'
   }, // Reference to the Rescuer model
   messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MessageModel' }],
},{
    timestamps: true,
  })

 const Chat=mongoose.model("Chat",ChatSchema)

  export default Chat