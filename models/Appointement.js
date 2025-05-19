const mongoose = require('mongoose');



const appointementSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    doctorId:{
        type:String,
        required:true
    },
    doctorInfo:{
         type: Object,
        required:true
    },
    userInfo:{
       type:Object,
       required:true
    },
    date:{
        type:String,
        required:true
    },

    Status:{
        type:String,
        required:true,
        default:'pending'
    },
    time:{
        type:String,
        required:true
    }

},{timestamps:true})

const Appointement= mongoose.model('appointements',appointementSchema)

module.exports= Appointement;