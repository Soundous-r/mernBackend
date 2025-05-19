const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getAllUsersController, getAllDoctorsController, changeAccountStatusController, BlockUserController } = require('../controllers/adminCtrl');
const router = express.Router();

//get all users
router.get('/getAllUsers',authMiddleware,getAllUsersController);
//get all doctors
router.get('/getAllDoctors',authMiddleware,getAllDoctorsController);


//Post accounst status
router.post('/changeAccountStatus',authMiddleware,changeAccountStatusController);

//block a user
router.post('/block-user/:userId', authMiddleware, BlockUserController);


module.exports = router;