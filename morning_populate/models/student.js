const mongoose = require('mongoose')
const StudentSchema = new mongoose.Schema({
    
    firstName:String,
    surname:String,
    adress :{type: mongoose.Types.ObjectId,
    ref: 'Adress'}
});

const Student = mongoose.model('Student', StudentSchema);
module.exports = Student;


