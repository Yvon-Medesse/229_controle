const mongoose = require('mongoose')

const { ObjectId } = mongoose.Types

const HavestSchema = new mongoose.Schema({
    publish_at:{
        type:Date,
        default: Date.now()
    },
    habest_date:{
        type:Date
    },
    content: {
        type: String,
    },
    title: {
        type: String,
    },
    user:{ 
        type: ObjectId,
        ref:"User",
        require: true
    },
    price: {
        type:Number
    },
    status:{
        type:String,
        default:"draft",
        enum:[
            "publish",
            "draft",
            "pending"
        ]
    }
    
})


const Havest = mongoose.model('havest', HavestSchema)

module.exports = Havest