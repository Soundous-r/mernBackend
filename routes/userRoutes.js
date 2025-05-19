const express = require('express');
const { loginController, registerController, authController ,applyDoctorController, getAllNotificationController,deleteAllNotificationController, getAllDoctorsController, bookAppController, AvailabilityController, userAppointementController} = require('../controllers/userCtrl');
const authMiddleware = require('../middlewares/authMiddleware');

//router object
const router = express.Router();    

//routes
//login or post 
router.post('/login', loginController);
//register or post
router.post('/register', registerController);

//auth or post
router.post("/getUserData", authMiddleware, authController);
module.exports = router;
//apply doctor or post
router.post("/apply-doctor", authMiddleware, applyDoctorController);

//Notification doctor or post
router.post("/get-all-notification", authMiddleware, getAllNotificationController);


//Notification doctor or delete
router.delete("/delete-all-notification", authMiddleware,deleteAllNotificationController);

//get all doctors
router.get('/getAllDoctors', authMiddleware, getAllDoctorsController);


//book appointement
router.post('/book-apointement',authMiddleware,bookAppController);

//check availability
router.post('/booking-availability',authMiddleware,AvailabilityController)

//listing appontements(patients)
router.get("/user-appointements",authMiddleware,userAppointementController)
module.exports = router;