const mongoose = require('mongoose')

const { ObjectId } = mongoose.Types

const ProductSchema = new mongoose.Schema({
    name:String,
    price:Number,
    category:{ 

        type: ObjectId,
        ref:"Category",
        require: true
    },
    stock:Number
})


const Product = mongoose.model('product', ProductSchema)

module.exports = Product