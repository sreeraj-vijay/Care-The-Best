import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_USER, { expiresIn: "30d" });
    res.cookie("jwtuser", token, {
        httpOnly:false,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "Strict",
        maxAge: 30 * 24 * 60 * 60 * 1000 // set maxAge in seconds
    });
};

export default generateToken;
