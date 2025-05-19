const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getDoctorController,updateProfileController, getDoctorByIdController, doctorAppController, UpdateStausController } = require('../controllers/doctorCtrl');


const router = express.Router();


//update profile
router.put('/updateProfile',authMiddleware,updateProfileController);
//post a doctor 
router.post('/getDoctor',authMiddleware,getDoctorController);


//get single doc info
router.post('/getDoctorById',authMiddleware,getDoctorByIdController);

//get appointements
router.get('/doctor-appointments',authMiddleware,doctorAppController);

//post update status
router.post('/update-status',authMiddleware,UpdateStausController)
module.exports = router;