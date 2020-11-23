const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  email:String,
  surname:String,
  firstName:String,
  date:Date,
  password: String,
  
});

//UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
const User = mongoose.model('User', UserSchema);

module.exports = User;



