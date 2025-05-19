const doctorModel = require("../models/doctorModel");
const User = require("../models/User");

const getAllUsersController=async(req,res)=>{
    try {
      const users= await User.find({});
      res.status(200).send({
        success:true,
        message:"All users list",
        data:users
      })  
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in getting all users",
            error:error.message
        })
        
    }
}

const getAllDoctorsController=async(req,res)=>{
    try {
        const doctors= await doctorModel.find();
        res.status(200).send({
            success:true,
            message:"All doctors list",
            data:doctors
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in getting all doctors",
            error:error.message
        })
        
    }
}
//doctor acount staus
const changeAccountStatusController=async(req,res)=>{
    try {
        const { doctorId, Status } = req.body;
        const doctor = await doctorModel.findByIdAndUpdate(doctorId, {Status });
        const user = await User.findByIdAndUpdate({_id:doctor.userId});
        const notification=user.notification;
        notification.push({
            type: 'doctor-account-status-updated',
            message: `Your account has been ${Status}`,
            onClickPath: '/notificaton'
        });
        user.isDoctor= Status === 'approved' ? true : false;
        await user.save();
        res.status(200).send({
            success:true,
            message:"Account status updated successfully",
            data:doctor
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in changing account status",
            error:error.message
        })
        
    }
}
const BlockUserController = async (req, res) => {
  try {
    const targetUserId = req.params.userId;  // Get the userId from the URL parameter

    // Proceed with blocking the user
    const user = await User.findByIdAndUpdate(targetUserId, { blocked: true }, { new: true });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "User blocked successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error blocking user",
      error,
    });
  }
};


module.exports={
    getAllUsersController,
    getAllDoctorsController,
    changeAccountStatusController,
    BlockUserController
}