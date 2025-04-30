// Here all APIs are built for Employee Salary

// Import Files
import express from "express";
import { addSalaryController, getEmployeeSalaryController, viewSalaryController } from "../controllers/salaryController.js";


// Router Instance
const router = express.Router()

// API ROUTES

// add Salary API
// http://localhost:8000/api/v2/employee/salary/add
router.post("/add",addSalaryController)

// view Salary API
// http://localhost:8000/api/v2/employee/salary/view
router.get("/view",viewSalaryController)

// API FOR SHOWING OLD DATA FOR A PERTICULER EMPLOYEE SALARY
// http://localhost:8000/api/v2/employee/salary/salary/
router.get("/salary/:_id",getEmployeeSalaryController)



export default router;


