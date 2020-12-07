const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required:true, unique:true},
    password: {type: String, required:true},
    isAdmin: {type:Boolean, required:true, default:false}
})

const productsSchema = new mongoose.Schema({
    name:{type:String, required:true},
    category: {type:String,required:true},
    image:{type:String,required:true},
    price:{type:Number,required:true,default:0},
    brand:{type:String,required:true},
    rating:{type: Number,required:true,default:0},
    numReviews:{type: Number,required:true,default:0},
    countInStock:{type: Number,required:true,default:0}
})

const productsModel = mongoose.model('products',productsSchema)

const userModel = mongoose.model('users',userSchema)

module.exports = {
    userModel,
    productsModel
}