const mongoose = require("mongoose")
const passportLocalMongoose = require('passport-local-mongoose');
const UserSchema = new mongoose.Schema({
    username:String,
    firstName:String,
    password:String,
    surname:String,
    profilePicture:String,

    // addProduct:{
    //     type:String,
    //     ref:'Product'

    // }
})
//UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(passportLocalMongoose, { usernameField: 'username' });

const User = mongoose.model('User', UserSchema);

module.exports = User;
