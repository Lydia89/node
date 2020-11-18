const mongoose = require('mongoose')
const AddressSchema = new mongoose.Schema({
   
    streetName:String,
    streetNumber:String,
    postCode:String,
    city :String
});
const Adress = mongoose.model('Adress',AddressSchema);
module.exports = Adress;



