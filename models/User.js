const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
name:{
    type: String,
    required:[true, 'Please enter your name'], 
}
,
email:{
    type: String,
    required:[true, 'Please enter your email'],
   
},
password:{
    type: String,
    required:[true, 'Please enter your password'],
   
},
isAdmin:{
    type: Boolean,
    default: false,
},
isDoctor:{
    type: Boolean,
    default: false,
},
notification:{
    type: Array,
    default: [],
},
seenNotification:{
    type: Array,
    default: [],
},
  blocked: {
    type: Boolean,
    default: false, // By default, the user is not blocked
  },

})

const User = mongoose.model('User', userSchema);
module.exports = User;