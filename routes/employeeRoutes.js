// Here all APIs are built for Employee

// Import Files
import express, { Router } from "express";
import { addEmployeeController, getEmployeeByDeptId, getEmployeeController, resetEmployeePasswordController, singleEmployeeController, singleEmployeeSalaryController, updateEmployeeController, upload } from "../controllers/employeeController.js";
import { isSignIn } from "../middlewares/authMiddleware.js";

// Router Instance
const router = express.Router()

// API ROUTES 

// ADD EMPLOYEE API
// https://employee-management-backend-blond.vercel.app/api/v2/employee/add
router.post("/add",isSignIn,upload.single("image"),addEmployeeController)

// SHOW ALL EMPLOYEES API
// https://employee-management-backend-blond.vercel.app/api/v2/employee/all
router.get('/all',isSignIn,getEmployeeController)

// API FOR SHOWING OLD DATA FOR A PERTICULER EMPLOYEE
// https://employee-management-backend-blond.vercel.app/api/v2/employee/single/
router.get("/single/:_id",isSignIn,singleEmployeeController)

// API FOR SHOWING OLD DATA FOR A PERTICULER EMPLOYEE SALARY
// https://employee-management-backend-blond.vercel.app/api/v2/employee/singlesalary
router.get("/singlesalary/:_id",singleEmployeeSalaryController)

// UPDATE DEPARTMENTS API
// https://employee-management-backend-blond.vercel.app/api/v2/employee/update/
router.put("/update/:_id",isSignIn,updateEmployeeController)

// API For Showing Employees of the periculer Departent selected 
// https://employee-management-backend-blond.vercel.app/api/v2/employee/department/
router.get("/department/:_id",getEmployeeByDeptId)

// Reset Password for Employees
// https://employee-management-backend-blond.vercel.app/api/v2/employee/reset-password
router.post("/reset-password",resetEmployeePasswordController)

export default router;