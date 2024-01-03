import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const MongodbconnectionString=process.env.MONGO_URL
   
    const conn = await mongoose.connect(
      MongodbconnectionString
    );
    console.log(`mONGO dB Conected : ${conn.connection.host}`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDB;