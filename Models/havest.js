const mongoose = require('mongoose')

const { ObjectId } = mongoose.Types

const HavestSchema = new mongoose.Schema({
    publish_at:{
        type:Date,
        default:Date.now()
    },
    habest_date: Date,
    content: String,
    title:String,
    user:
    {
        type:ObjectId,
        ref:"User",
        require: true
    },
    price:Number,
    status:
    {
        type:String,
        default:"published",
        enum:[
            "draft",
            "publish",
            "pending"
        ]
    }
    
})


const Havest = mongoose.model('havest', HavestSchema)

module.exports = Havest