import express from "express"
import path from "path"
import userRoute from './Routes/UserRoute.js';
import adminRoute from "./Routes/AdminRoute.js"
import rescuerRoute from "./Routes/RescuerRoute.js"
import connectDB from "./Config/db.js";
import dotenv from "dotenv"
import cors from 'cors'
import Paymentrouter from "./Routes/Stripe.js";
import cookieParser from "cookie-parser"

dotenv.config();
const app=express()
app.use(cookieParser());
connectDB()
app.use(express.json({ limit: '10mb' }));
app.use(express.static("Public"))

app.use(express.json())
app.use(express.urlencoded({ limit: '10mb', extended: true }));
const port =process.env.PORT

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/user",userRoute)
app.use("/admin",adminRoute)
app.use("/rescuer",rescuerRoute)
app.use("/stripe",Paymentrouter)

if(process.env.NODE_ENV==="production"){
  console.log("hai")
  const __dirname=path.resolve()
  const parentDir = path.join(__dirname, '..');
  console.log(parentDir)
  app.use(express.static(path.join(parentDir,'/Front-end/dist')))
  app.get('*',(req,res)=>res.sendFile(path.resolve(parentDir,'Front-end','dist','index.html')))
}else{
app.get('/',(req,res)=>{
    res.send("Server is Ready")
})
}
const server = app.listen(port,()=>{
    console.log(`server started successfully on ${port}`)
})
import { Server } from 'socket.io'

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: ["http://localhost:3000",'http://localhost:5173'],
  },
}); 
io.on("connection",(socket)=>{
    socket.on("setup",(userData)=>{
    socket.join(userData._id);
    socket.emit("connected");
  });
  socket.on('join chat',(room)=>{
    socket.join(room);
    console.log("User Joined room:"+room);
  })
  socket.on('new message',(newMessageReceived)=>{
    var chat = newMessageReceived.room  
  
    io.to(chat.sender).emit('message received',newMessageReceived);
    
  })  
})