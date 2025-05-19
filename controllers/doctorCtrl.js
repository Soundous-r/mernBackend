const Appointement = require("../models/Appointement");
const doctorModel = require("../models/doctorModel");
const User = require("../models/User");


const getDoctorController = async (req,res)=>{
    try {
        const doctor =await doctorModel.findOne({userId:req.body.userId});
        res.status(200).send({
            success:true,
            message:"Doctor details fetched successfully",
            data:doctor
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in getting doctor details",
            error:error.message
        })
        
    }
}


//update doctor profile
const updateProfileController=async (req,res)=>{
try {
    const doctor = await doctorModel.findOneAndUpdate({userId:req.body.userId},
        req.body,
        {new:true}
    );
    res.status(200).send({
        success:true,
        message:"Doctor profile updated successfully",
        data:doctor
    })
} catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:"Error in updating doctor profile",
        error:error.message
    })
    
}








}

//get doctor by id
const getDoctorByIdController = async (req,res)=>{
    try {
        const doctor = await doctorModel.findOne({_id:req.body.doctorId});
        res.status(200).send({
            success:true,
            message:"Doctor details fetched successfully",
            data:doctor
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in getting doctor by id",
            error:error.message
        })
        
    }
}

//get doctor appointements
const doctorAppController = async(req,res)=>{
    try {
        const doctor = await doctorModel.findOne({userId:req.body.userId})
        if (!doctor) {
  return res.status(404).send({
    success: false,
    message: "Doctor not found with this user ID",
  });
}

        const appointements = await Appointement.find({doctorId:doctor._id})
        res.status(200).send({
            success:true,
            message:"Docotr appointmements fetched successfully",
            data:appointements
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in fetching doctor appointments",
            error
        })
    }
}
const UpdateStausController= async(req,res)=>{
    try {
        const {appointmentId,status}= req.body;
        const appointements= await Appointement.findByIdAndUpdate(appointmentId,{Status: status}, { new: true });
        if (!appointements) {
  return res.status(404).send({ success: false, message: "Appointment not found" });
}

       const user = await User.findOne({_id:appointements.userId});
       const notification=user.notification;
notification.push({
      type:"status-updated",
     message: `your appointement has been ${status}`,

      onClickPath:'/doctor-appointments'
    })
    await user.save();
     res.status(200).send({
            success:true,
            message:"status updated successfully",
            data:appointements
        })
    } catch (error) {
          console.log(error);
        res.status(500).send({
            success:false,
            message:"error in update status",
            error
        })
    }
}
module.exports = {
    getDoctorController,
    updateProfileController,
    getDoctorByIdController,
    doctorAppController,
    UpdateStausController
}