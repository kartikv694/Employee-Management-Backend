// Here All The Controllers are Built For Employees Salaries

// Import files
import employeeModal from "../models/employeeModal.js"
import salaryModel from "../models/salaryModel.js"


// addSalaryController
export const addSalaryController = async (req,res) => {
    try {
        const {employeeId,basicSalary,allowances,deductions,payDate} = req.body
        const totalSalary = parseInt(basicSalary) +  parseInt(allowances) - parseInt(deductions)
        const newSalary = new salaryModel({
            employeeId,
            basicSalary,
            allowances,
            deductions,
            payDate,
            netSalary: totalSalary
        })
        console.log(req.body)

        const salary = await newSalary.save()
        res.status(201).json({
            success: true,
            message: "Salary Added Successfully!",
            salary
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Error While Adding Salary!",
        })
    }
}

// viewSalaryController
export const viewSalaryController = async (req,res) => {
    try {
        const salary = await salaryModel.find()
        .populate("employeeId")
        res.status(201).json({
            success: true,
            message: "Showing Employees Salaries...",
            salary
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error While Getting Salary..",
            error
        })
    }
}

// getEmployeeSalaryController
export const getEmployeeSalaryController  = async(req,res)=>{
    try {
        let salary;
         salary = await salaryModel.findOne({employeeId: req?.params?._id})
         .populate("employeeId")
         if (!salary) 
         {
            const employee = await employeeModal.findOne({userId: req?.params?._id})
            salary = await salaryModel.findOne({employeeId: employee?._id})
            .populate("employeeId")
         }
        res.status(200).json({
            success: true,
            salary
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while showing Details..",
            error
        })
    }
}