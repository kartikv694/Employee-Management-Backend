// Here All the Controllers Are Built For Employee Leaves

// Import Files
import employeeModal from "../models/employeeModal.js"
import leaveModel from "../models/leaveModel.js"

// applyLeaveController
export const applyLeaveController = async (req,res) => {
    try {
        const {userId,leaveType,startDate,endDate,reason} = req.body
        const leave = new leaveModel({
            employeeId : userId,
            leaveType,
            startDate,
            endDate,
            reason
        })
        await leave.save()
        res.status(201).json({
            success: true,
            message: "Leave Applied!",
            leave
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message: "Error While Applying Leave..",
            error
        })
    }
}

// ShowLeavesController
export const showLeavesController = async (req,res) => {
    try {
        const employee = await employeeModal.findOne({userId:req.params._id})
        const leaves =  await leaveModel.find({employeeId:employee.userId})
        return res.status(200).json({
            success:true,
            message: "Showing All Leave Details..",
            leaves
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message: "Error while Showing Leaves...",
            error
        })
    }
}

// getEmployeesLeavesController
export const getEmployeesLeavesController = async (req,res) => {
    try {
        const leaves = await leaveModel.find()
        .populate("employeeId","-password")
        
        res.status(200).json({
            success: true,
            message: "Showing All Leave Requests..",
            leaves
        })
    } catch (error) {
        req.status(500).json({
            success:false,
            message: "Error While Showing Leave Details...",
            error
        })
    }
}

// LeaveDetailController
export const LeaveDetailController = async (req,res) => {
    try {
        const leave  = await leaveModel.findOne({_id:req?.params?._id})
        .populate("employeeId","-password")
        res.status(200).json({
            success: true,
            message: "Showing Leave Details...",
            leave
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message:"Error While Showing Leave Details...",
            error
        })
    }
}

// leaveStatusController
export const leaveStatusController = async (req,res) => {
    try {
        const leave = await leaveModel.findByIdAndUpdate({_id:req.params._id},{status:req.body.status})
        await leave.save()
        res.status(201).json({
            success: true,
            message:"Status Updated..",
            leave
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Status Error!",
            error
        })
    }
}