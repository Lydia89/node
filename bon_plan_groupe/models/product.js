const mongoose = require("mongoose")
const passportLocalMongoose = require('passport-local-mongoose');
const ProductSchema = new mongoose.Schema({
    name:String,
    price:Number,
    discription:String,
    city:String,
    image:String
})
ProductSchema.plugin(passportLocalMongoose);
//ProductSchema.plugin(passportLocalMongoose, { usernameField: 'username' });

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
