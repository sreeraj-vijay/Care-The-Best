import User from "../Models/UserModel.js";
import Chat from "../Models/ChatModel.js";
import asyncHandler from "express-async-handler"
import Message from "../Models/MessageModel.js";
import Rescuer from "../Models/RescuerModel.js";



const createRoom = asyncHandler(async(req,res)=>{
        try {
         
            const {useremail,rescuerid}=req.body
            const Userdetails=await User.findOne({email:useremail})
            if(Userdetails){
            let chatRoom = await Chat.findOne({
                user:Userdetails._id,
                rescuer:rescuerid
            })
    
            if(!chatRoom){
                chatRoom = new Chat({
                    user:Userdetails._id,
                    rescuer:rescuerid,
                    messages:[]
                })
                await chatRoom.save();
            }
            const roomDetails = await Chat.findOne({_id:chatRoom._id})
            
            res.status(200).json(roomDetails);
        }
        } catch (error) {
            res.status(500).json({ message: 'Error creating or getting chat room' });
        }
    })
    const chatuserDetails=asyncHandler(async(req,res)=>{
        try{
            const email=req.body.email
            const userdata=await User.findOne({email:email})
            if(userdata){
                res.status(201).json(userdata)
            }else{
                res.status(401).json("No userdata is available")
            }

        }catch(error){
            res.status(401).json("Net Work Error")

        }

    })
    const saveChat = asyncHandler(async (req, res) => {
       
        const {rescuerid,userid,content}=req.body
        const roomDetails=await Chat.findOne({user:userid,rescuer:rescuerid})
        // Create a new chat message
        if(roomDetails){
        const newMessage = new Message({
          room: roomDetails._id,
          sender: roomDetails.user,
          senderType: "User",
          content: content,
        });
      
        // Save the chat message
        await newMessage.save();
       
        roomDetails.messages.push(newMessage._id)
        
        await roomDetails.save()
   
        // Return the chat message with all populated fields
        res.json(newMessage);
    }
    })
    const userChatedrescuer = asyncHandler(async (req, res) => {
        const email = req.body.email;
        const userData = await User.findOne({ email: email });
      
        if (userData) {
          try {
            const chatDetails = await Chat.find({ user: userData._id });
      
            if (chatDetails.length > 0) {
              const rescuerPromises = chatDetails.map(async (room) => {
                const rescuerId = room.rescuer; // Adjust the field name accordingly
      
                const rescuer = await Rescuer.findById(rescuerId);
      
                // Assuming User is your model/schema for users
                return rescuer;
              });
      
              const rescuerDataArray = await Promise.all(rescuerPromises);
      
              // Now, userDataArray is an array containing user data for all rooms
            
              res.status(200).json(rescuerDataArray);
            } else {
           
              res.status(404).json({ error: "No chat details found" });
            }
          } catch (error) {
           
            res.status(500).json({ error: "Internal server error" });
          }
        } else {
         
          res.status(404).json({ error: "Rescuer not found" });
        }
      });
    const displayMessages=asyncHandler(async(req,res)=>{
        try{
    
        const {rescuerid,userid}=req.body
        const messageContents = [];
        const roomDetails =await Chat.findOne({rescuer:rescuerid,user:userid})
        if(roomDetails){
            const messages = roomDetails.messages;
           
            for (const messageId of messages) {
                const messageContent = await Message.findOne({ _id: messageId });
              
                if (messageContent) {
                    const messageObject = {
                        senderType: messageContent.senderType,
                        content: messageContent.content,
                      };
                    
                    messageContents.push(messageObject);
                  }
            }
            
            res.status(201).json(messageContents)
        }
    
        }catch(error){
            res.status(401).json("No chat data is Available")
        }

    })
    const chatrescuerDetails=asyncHandler(async(req,res)=>{
        try{
            const email=req.body.email
            const rescuerdata=await Rescuer.findOne({email:email})
            if(rescuerdata){
                res.status(201).json(rescuerdata)
            }else{
                res.status(401).json("No rescuerdata is available")
            }

        }catch(error){
            res.status(401).json("Net Work Error")

        }

    })

    const rescuerSendMessage = asyncHandler(async (req, res) => {
        
        const {userid,rescuerid,content}=req.body
        const roomDetails=await Chat.findOne({user:userid,rescuer:rescuerid})
        // Create a new chat message
        if(roomDetails){
        const newMessage = new Message({
          room: roomDetails._id,
          sender: roomDetails.user,
          senderType: "Rescuer",
          content: content,
        });
   
        // Save the chat message
        await newMessage.save();
       
        roomDetails.messages.push(newMessage._id)
        
        await roomDetails.save()
   
        // Return the chat message with all populated fields
        res.json(newMessage);
    }
    })
    const chatedUser = asyncHandler(async (req, res) => {
        const email = req.body.email;
        const rescuerData = await Rescuer.findOne({ email: email });
      console.log(rescuerData)
        if (rescuerData) {
          try {
            const chatDetails = await Chat.find({ rescuer: rescuerData._id });
      console.log(chatDetails)
            if (chatDetails.length > 0) {
              const userPromises = chatDetails.map(async (room) => {
                const userId = room.user; // Adjust the field name accordingly
      
                const user = await User.findById(userId);
      
                // Assuming User is your model/schema for users
                return user;
              });
      
              const userDataArray = await Promise.all(userPromises);
      console.log(userDataArray)
              // Now, userDataArray is an array containing user data for all rooms
            
              res.status(200).json(userDataArray);
            } else {
           
              res.status(404).json({ error: "No chat details found" });
            }
          } catch (error) {
           
            res.status(500).json({ error: "Internal server error" });
          }
        } else {
         
          res.status(404).json({ error: "Rescuer not found" });
        }
      });
      const rescuerdisplayMessages=asyncHandler(async(req,res)=>{
        try{
    
        const {userid,rescuerid}=req.body
        const messageContents = [];
        const roomDetails =await Chat.findOne({user:userid,rescuer:rescuerid})
        if(roomDetails){
            const messages = roomDetails.messages;
            for (const messageId of messages) {
                const messageContent = await Message.findOne({ _id: messageId });
              
                if (messageContent) {
                    const messageObject = {
                        senderType: messageContent.senderType,
                        content: messageContent.content,
                      };
                    
                    messageContents.push(messageObject);
                  }
            }
         
            res.status(201).json(messageContents)
        }
    
        }catch(error){
            res.status(401).json("No chat data is Available")
        }

    })

export {
    createRoom,
    chatuserDetails,
    saveChat,
    displayMessages,
    chatrescuerDetails,
    rescuerSendMessage,
    chatedUser ,
    rescuerdisplayMessages,
    userChatedrescuer
}
