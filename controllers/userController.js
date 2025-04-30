import  userModel  from "../models/userModel.js";
import { comparePassword, hashedPassword } from "../utils/utils.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

// Register Controller
export const registerController = async (req,res)=>{
    try {
         const{name,email,password,role} = req.body;
         const hashPass = await hashedPassword(req.body.password)
         const user  = new userModel({
            name,
            email,
            password:hashPass,
            role
         })
         await user.save()
         res.status(201).json({
            success:true,
            message:"Registeration Successful!",
            user
         })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Error while register the user",
            error
        })
    }
}

// Login Controller
export const loginController = async (req, res) => {
    try {
        // FOR INCORRECT OR EMPTY DETAILS
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(404).json({
                message: "Email and password is required!"
            })
        }
        //EXISTING USER
        const existingUser = await userModel.findOne({ email })
        if (!existingUser) {
            return res.status(404).json({ message: "Not registered. Please register first!" })
        }
        // Compare of passwords 
       const  match = await comparePassword(password,existingUser?.password)
        if (!match) {
            return res.status(401).json({
                message: "Invalid Credentials!"
            })
        }

        // JWT TOKEN
        const token = jwt.sign({_id:existingUser._id},process.env.JWT_SECRET_KEY,{expiresIn:"1d"})
        res.status(201).json({
            success: true,
            message: "Login successful!",
            token,
            user: {
                id: existingUser.id,
                name: existingUser.name,
                email: existingUser.email,
                role: existingUser.role,

            }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while Login the User!!",
            error
        })
    }
}   