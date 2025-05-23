// Here all APIs are built for Departments

// Import Files 
import express from "express";
import { addDepartmentController, deleteDepartmentController, getAllDepartmentsController, getDepartmentController, updateDepartmentController } from "../controllers/departmentController.js";
import { isSignIn } from "../middlewares/authMiddleware.js";

// Router Instance
const router = express.Router()


// API ROUTES 

// ADD DEPARTMENT API
// http://localhost:8000/api/v2/department/add
router.post("/add",isSignIn,addDepartmentController)

// SHOW ALL DEPARTMENTS API
// http://localhost:8000/api/v2/department/all
router.get("/all",isSignIn,getAllDepartmentsController)

// API FOR SHOWING OLD DATA FOR A PERTICULER DEPARTMENT
// http://localhost:8000/api/v2/department/get/
router.get("/get/:_id",isSignIn,getDepartmentController)

// UPDATE DEPARTMENTS API
// http://localhost:8000/api/v2/department/update/
router.put("/update/:dept_id",isSignIn,updateDepartmentController)

// DELETE DEPARTMENTS API
// http://localhost:8000/api/v2/department/delete
router.delete("/delete/:dept_id",isSignIn,deleteDepartmentController)


export default router;