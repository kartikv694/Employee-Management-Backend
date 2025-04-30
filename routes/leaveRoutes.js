// Here all APIs are built for Employee Leaves

// import Files
import express from "express";
import { applyLeaveController, getEmployeesLeavesController, LeaveDetailController, leaveStatusController, showLeavesController } from "../controllers/leaveController.js";
import { isSignIn } from "../middlewares/authMiddleware.js";

// Instance of Router
const router = express.Router()

// API Routes

// APPLY LEAVE API
// https://employee-management-backend-ten.vercel.app/api/v2/employee/leave/apply
router.post("/apply",isSignIn,applyLeaveController) 

// SHOW LEAVE API
// https://employee-management-backend-ten.vercel.app/api/v2/employee/leave/all-leaves/
router.get("/all-leaves/:_id",isSignIn,showLeavesController)

// SHOW ALL EMPLOYEE LEAVES 
// https://employee-management-backend-ten.vercel.app/api/v2/employee/leave/emp-leaves
router.get("/emp-leaves",isSignIn,getEmployeesLeavesController)

// SHOW LEAVE DETAILS
// https://employee-management-backend-ten.vercel.app/api/v2/employee/leave/details/
router.get("/details/:_id",isSignIn,LeaveDetailController)

// STATUS OF LEAVE
// https://employee-management-backend-ten.vercel.app/api/v2/employee/leave/status/
router.put("/status/:_id",leaveStatusController)

export default router;