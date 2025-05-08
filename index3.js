// Main File of Server Side or Backend

// Import Files
import express from "express";
import "dotenv/config"
import chalk from "chalk";
import connectDB from "./db/config.js";
import cors from "cors";
import userRoutes from "./routes/userRoute.js"
import departmentRoutes from "./routes/departmentRoutes.js"
import employeeRoutes from "./routes/employeeRoutes.js"
import salaryRoutes from "./routes/salaryRoutes.js"
import leaveRoutes from "./routes/leaveRoutes.js"


//Instance of Express
const app = express() 
// PORT
const port = process.env.PORT

// Database Connection
connectDB()

// MiddleWares
app.use(cors({
    origin:"https://employee-management-frontend-nu.vercel.app",
    credentials: true
}))
app.use(express.json())
app.use(express.static('public/uploads'))

// Routes
// common API = https://employee-management-backend-blond.vercel.app/api/v2/emp
app.use("/api/v2/emp/",userRoutes)
// common API = https://employee-management-backend-blond.vercel.app/api/v2/department
app.use("/api/v2/department/",departmentRoutes)
// common API = https://employee-management-backend-blond.vercel.app/api/v2/employee
app.use("/api/v2/employee/",employeeRoutes)
// common API = https://employee-management-backend-blond.vercel.app/api/v2/employee/salary
app.use("/api/v2/employee/salary/",salaryRoutes)
// common API = https://employee-management-backend-blond.vercel.app/api/v2/employee/leave
app.use("/api/v2/employee/leave/",leaveRoutes)

// BackEnd Local Server http://localhost:8000
app.listen(port,()=>{
    console.log(chalk.blue(`server running at http://localhost:${port}`))
})