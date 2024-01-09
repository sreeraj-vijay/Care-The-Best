import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const MongodbconnectionString = "mongodb+srv://sreerajvijay17:buTaJ35j00ZwJFBm@cluster0.mwubj0s.mongodb.net/Animalrescueandadoptioncenter?retryWrites=true&w=majority"
   
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
