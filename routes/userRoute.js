// Here All APIS Are Built For Users

// Import Files
import express from 'express';
import { loginController, registerController, resetPasswordController } from '../controllers/userController.js';
import { isAdmin, isSignIn } from '../middlewares/authMiddleware.js';

// ROUTER INSTANCE
const router = express.Router()

// API ROUTES
// Register API
// https://employee-management-backend-ime7.onrender.com/api/v2/emp/register
router.post("/register",registerController)

// Login API
// https://employee-management-backend-ime7.onrender.com/api/v2/emp/login
router.post("/login",loginController)

// RESET PASSWORD API
//  https://employee-management-backend-ime7.onrender.com/api/v2/emp/reset-password
router.post("/reset-password",resetPasswordController)

// Protected Routes
// Admin protected API
// https://employee-management-backend-ime7.onrender.com/api/v2/emp/admin-protected
router.get("/admin-protected",isSignIn,isAdmin,(req,res)=>{
    res.status(200).json({ok:true})
})

// User protected API
// https://employee-management-backend-ime7.onrender.com/api/v2/emp/user-protected
router.get("/user-protected",isSignIn,(req,res)=>{
    res.status(200).json({ok:true})
})

export default router;