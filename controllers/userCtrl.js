const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const doctorModel = require('../models/doctorModel');
const Appointement=require('../models/Appointement')
const moment = require('moment')
//register callback

const registerController =async(req,res)=>{
    try{
const existingUser =await User.findOne({email:req.body.email});
if(existingUser){
    return res.status(200).send({success:false,message:'User already exists'});
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new User(req.body);
    await newUser.save();
    console.log(newUser);
    res.status(201).send({success:true,message:'User registered successfully'});
    }
    catch(error){
        console.log(error);
        res.status(500).send({success:false,message:`Server error ${error.message}`});
    }
}


//login callback
const loginController =async (req,res)=>{
    try {
        const user = await User.findOne({email:req.body.email});
        if(!user){
            return res.status(200).send({success:false,message:'User not found'});
        }
          if (user.blocked) {
      return res.status(403).send({
        success: false,
        message: 'Your account has been blocked. Please contact support.',
      });
    }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        
        if(!isMatch){
            return res.status(200).send({success:false,message:'Invalid email or passsword'});
        }
        const token =jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'});
        res.status(200).send({success:true,message:'Login successful',token});
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false,message:`error in login ${error.message}`});
    }
}

const  authController = async (req, res) => {
    try {
      const user = await User.findById({ _id: req.body.userId });
      user.password = undefined; // remove password from user object
      if (!user) {
        return res.status(200).send({
          message: "user not found",
          success: false,
        });
      } else {
        res.status(200).send({
          success: true,
          data:user
        });
      }
    
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "auth error",
        success: false,
        error,
      });
    }
  };
//apply doctor callback
  const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = await doctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminUser = await User.findOne({ isAdmin: true });
    const notification= adminUser.notification;
    notification.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/docotrs",
      },
    });
    await User.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      success: true,
      message: "Doctor Account Applied successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Applying For Doctor",
    });
  }
};
 

//notification controller
const getAllNotificationController = async (req,res)=>{
  try {
    const user= await User.findOne({_id:req.body.userId});
    const seenNotification = user.seenNotification;
    const notification = user.notification;
    seenNotification.push(...notification);
    user.notification = [];
    user.seenNotification= notification;
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "All notifications marked as seen",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting notifications",
    });
  }
}


//delete all notification controller
const deleteAllNotificationController= async(req,res)=>{
  try {
    const user =await User.findOne({_id:req.body.userId});
    user.seenNotification = [];
    user.notification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "All notifications deleted successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While deleting notifications",
    });
    
  }
}
//get all doctors
const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({Status: "approved"});
    res.status(200).send({
      success: true,
      message: "Doctors list fetched successfully",
      data: doctors,
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting doctors",
    });
    
  }
}

const bookAppController = async (req, res) => {
  try {
    req.body.status = "pending";  // status is fine
    // Don't convert date/time, keep them as passed from frontend
    const newAppointement = new Appointement(req.body);
    await newAppointement.save();

    const user = await User.findOne({ _id: req.body.doctorInfo.userId });
    user.notification.push({
      type: "new-appointement-request",
      message: `A new appointment request from ${req.body.userInfo.name}`,
      onClickPath: "/user/appointements",
    });
    await user.save();

    res.status(200).send({
      success: true,
      message: "Appointment booked successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while booking",
    });
  }
};



//availability check
const AvailabilityController = async (req, res) => {
  try {
    
    const date = req.body.date; 
    const time = req.body.time; 
    
    const doctorId = req.body.doctorId;
   
    console.log("Checking availability for doctor:", doctorId);
    console.log("Requested date:", date);
    console.log("Requested time:", time);

    const appointments = await Appointement.find({
      doctorId: doctorId,
      date: date,
      time: time, 
    });

    if (appointments.length > 0) {
     
      return res.status(200).send({
        message: "Appointments not available at this time",
        success: false,
      });
    } else {
      
      return res.status(200).send({
        success: true,
        message: "Appointments available",
      });
    }
  } catch (error) {
    console.error("Error while checking availability:", error);
    res.status(500).send({
      success: false,
      error: error,
      message: "Error in checking availability",
    });
  }
};




//listing appoitements
const userAppointementController= async(req,res)=>{
  try {
    const appointements= await Appointement.find({userId:req.body.userId});
    res.status(200).send({
      success:true,
      message:"User appointements fetched successfully",
      data:appointements,
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:"error in displaying user appointements",
      error
    })
  }
}
module.exports = {loginController, registerController,authController,applyDoctorController, getAllNotificationController,deleteAllNotificationController,getAllDoctorsController,bookAppController,AvailabilityController,userAppointementController}