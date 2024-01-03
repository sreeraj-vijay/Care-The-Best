import jwt from "jsonwebtoken"
const generateToken=(res,adminId)=>{
    const Token=jwt.sign({adminId},"Admin",
       {expiresIn:"30d"})
       res.cookie("jwtadmin", Token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 *100
      });

}
export default generateToken