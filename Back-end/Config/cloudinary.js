import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv"
dotenv.config()
const cloudName=process.env.CLOUD_NAME
const apiKey=process.env.API_KEY
const apiScrect_key=process.env.API_SECRET_KEY
cloudinary.config({
    cloud_name:cloudName,
    api_key:apiKey,
    api_secret:apiScrect_key
})
export {cloudinary}