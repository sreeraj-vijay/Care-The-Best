import jwt from "jsonwebtoken"
const generateToken=(res,rescuerId)=>{
    const Token=jwt.sign({rescuerId},"rescuer",
       {expiresIn:"30d"})
       res.cookie("jwtrescuer", Token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 *100
      });

}
export default generateToken