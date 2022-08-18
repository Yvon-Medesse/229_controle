const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    name:String,
    code:String,
    
})


const Category = mongoose.model('Category', CategorySchema)

module.exports = Category