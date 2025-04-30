import jwt from 'jsonwebtoken'
import "dotenv/config"
import userModel from '../models/userModel.js';

// Login Middleware
export const isSignIn = (req,res,next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1];
        // console.log(token)
        if (!token) {
            res.status(404).json({message:"Token not Provided!"})
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        if (decoded) {
            req.user = decoded._id;
            next()
        }
    } catch (error) {
        console.log(error)
        res.status(401).json({message:"Invalid Token"})
    }
}


// Admin or Employee Middleware
export const isAdmin = async (req,res,next)=>{
    try {
        const user = await userModel.findOne({_id:req?.user})
        if (user?.role!=="admin") 
        {
            return res.status(401).json({
                success: false,
                message: "You are not a Admin User!"
            })
        }
        else
        {
            next()
        }
    } catch (error) {
        console.log(error)
    }
}