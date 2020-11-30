const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    discription: String,
    city:{
        type:String,
        enum: ['Paris', 'Lyon', 'Marseille']
    },
    images: [String],
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    }


    // image: {
    //     type:String,
    //     enum:['image1','image2']
    //    // required:true


    // }, 


})


const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
