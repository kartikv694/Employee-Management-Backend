// Here All The Controllers are Built For Departments

// Import Files
import departmentModel from "../models/departmentModel.js";

// addDepartmentController 
export const addDepartmentController = async (req,res)=>{
    try {
        const {dept_name,description} = req.body;
        if (!dept_name) {
            return res.status(404).json({message:"Department Name is Required!"})
        }
        if (!description) {
            return res.status(404).json({message:"Description is Required!"})
        }
        else
        {
                const department = new departmentModel({
                    dept_name:dept_name,
                    description:description
                })
                await department.save()
                res.status(201).json({
                    success: true,
                    message: "New Department Added!",
                    department
                })
        }
    } catch (error) {
        req.status(500).json({
            success: false,
            message: "Error While Adding Department..."
        })
    }

}

// getAllDepartmentController
export const getAllDepartmentsController = async (req,res)=>{
    try {
        const departments = await departmentModel.find();
        res.status(200).json({
            success: true,
            message: "Showing All the Departments..",
            departments
        })
    } catch (error) {
        req.status(500).json({
            success: false,
            message: "Error while showing the Departments...",
            error
        })
    }
}

// getDepartmentController
export const getDepartmentController = async (req,res) => {
    try {
        const department = await departmentModel.findById({ _id: req.params._id});
        res.status(200).json({
            success: true,
            message:"Showing Department Details...",
            department
        })
    } catch (error) {
        req.status(500).json({
            success: false,
            message:"Error while getting Department...",
            error
        })
    }
}

// UpdateDepartmentController
export const updateDepartmentController = async (req,res)=>{
    try {
        const department =  await departmentModel.findByIdAndUpdate(
            {_id : req.params.dept_id},
            {
                $set:{
                    dept_name:req.body.dept_name,
                    description: req.body.description
                }
            },
            {new:true}
        )
        res.status(201).json({
            success:true,
            message:"Department Updated Successfully!..",
            department
        })
    } catch (error) {
        req.status(500).json({
            success: false,
            message:"Error while Updating the Departments...",
            error
        })
    }
}

// deleteDepartmentController
export const deleteDepartmentController = async (req,res)=>{
    try {
        const department = await departmentModel.findByIdAndDelete(
            {_id : req.params.dept_id},
            {
                $set: {
                    dept_name:req.body.dept_name,
                    description: req.body.description
                }
            },
            {new:true}
        )
        res.status(201).json({
            success:true,
            message:"Department Deleted Successfully!...",
            department
        })
    } catch (error) {
        req.status(500).json({
            success: false,
            message: "Error while Deleting the Department...",
            error
        })
    }
}