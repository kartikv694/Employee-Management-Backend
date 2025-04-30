// Here All The Controllers are Built For Employees

// Import Files
import employeeModal from "../models/employeeModal.js"
import userModel from "../models/userModel.js"
import { hashedPassword } from "../utils/utils.js"
import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
           cb(null,'public/uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname))
    }
})

const upload = multer({storage:storage})
export {upload}


// addEmployeeController
export const addEmployeeController = async(req,res)=>{
  try {
    // console.log(req.file)`
          const {
            name,
            email,
            employeeId,
            dob,
            gender,
            designation,
            department,
            salary,
            password,
            role
          }  = req.body 
          
           const user =  await userModel.findOne({email})
           if(user)
           {
            return res.status(400).json({message:"user already registered!"})
           }
            
         const newUser =   new  userModel({
            name,
            email,
            password: await hashedPassword(password),
            role, 
            profileImage:req.file ? req.file.filename :""

           })

          //  console.log(req.file)
        const savedUser =  await  newUser.save()
        // console.log(savedUser._id)

        // console.log(req.body.employeeId)


        const employee =  new employeeModal({
            userId : savedUser._id,
            employeeId,
            dob,
            gender,
            designation,
            department,
            salary
        })

        // console.log(employee)
        await employee.save();

         res.status(201).json({
            success:true,
            message :'New employee added!',
            employee
         })
         
  } catch (error) {
    console.log(error)
      res.status(500).json({
        success:false,
        message:"error while adding employee...",
        error
      })  
  }
}


// getEmployeeController
export const getEmployeeController = async (req,res)=>{
    try {
        const employees = await employeeModal.find()
        .populate("userId",{password:0})
        .populate("department")
        res.status(201).json({
            success: true,
            employees
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while getting employees",
            error
        })
    }
}


// singleEmployeeController
export const singleEmployeeController = async (req,res) => {
    try {
        let employee;
         employee = await employeeModal.findOne({_id:req.params._id})
        .populate("userId")
        .populate("department")
        if (!employee) 
        {
            employee = await employeeModal.findOne({userId:req.params._id})
            .populate("userId",{password:0})
            .populate("department")   
        }
        res.status(200).json({
            success: true,
            message: 'Showing Employee Details!',
            employee
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while showing Details..",
            error
        })
    }
}

// singleEmployeeSalaryController
export const singleEmployeeSalaryController = async (req,res) => {
    try {
        const employee = await employeeModal.findOne({_id:req.params._id}).populate("employeeId")
        res.status(200).json({
            success: true,
            message: 'Showing Employee Details!',
            employee
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while showing Details..",
            error
        })
    }
}

// updateEmployeeController
export const updateEmployeeController = async (req,res) => {
    try {
        // console.log(req.body)
        const {name,designation,department,salary} = req.body
        const employee = await employeeModal.findById({_id:req.params._id})
        if (!employee) 
        {
            return res.status(404).json({
                success: false,
                message: "Employee not Found.."
            })   
        }
        const user = await userModel.findById({_id:employee?.userId})
        if (!user) 
        {
            return res.status(404).json({
                success: false,
                message: "User not Found.."
            })    
        }

        const updatedUser = await userModel.findByIdAndUpdate({_id:employee.userId},{name});
        const updatedEmployee = await employeeModal.findByIdAndUpdate({_id:req.params._id},
            {
                designation,
                department,
                salary
            }
        ) 
        
        if (!updatedUser|| !updatedEmployee) 
        {
            return res.status(404).json({
                success: false,
                message: "Document Not Found! "
            })            
        }
        res.status(201).json({
            success: true,
            message: "Employee updated!",
            updatedUser,
            updatedEmployee
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Error while Updating Employee Details..",
            error
        })
    }    
}

// getEmployeeByDeptId
export const getEmployeeByDeptId = async (req,res) => {
    // res.send("ok")
    try {
        const{_id} = req.params;
        const employees = await employeeModal.find({department: _id}).populate("userId")
        return res.status(201).json({
            success: true,
            message: "Showing Employee Details..",
            employees
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while Getting Employee by dept_id...",
            error
        })
    }
}