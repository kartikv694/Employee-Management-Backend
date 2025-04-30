import express from 'express';
import { loginController, registerController } from '../controllers/userController.js';
import { isAdmin, isSignIn } from '../middlewares/authMiddleware.js';

// ROUTER INSTANCE
const router = express.Router()
// API ROUTES
// Register API
// http://localhost:8000/api/v2/emp/register
router.post("/register",registerController)

// Login API
// http://localhost:8000/api/v2/emp/login
router.post("/login",loginController)

// Protected Routes
// Admin protected API
// http://localhost:8000/api/v2/emp/admin-protected
router.get("/admin-protected",isSignIn,isAdmin,(req,res)=>{
    res.status(200).json({ok:true})
})

// User protected API
// http://localhost:8000/api/v2/emp/user-protected
router.get("/user-protected",isSignIn,(req,res)=>{
    res.status(200).json({ok:true})
})

export default router;