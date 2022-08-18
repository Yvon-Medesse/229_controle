const mongoose = require('mongoose')

const { ObjectId } = mongoose.Types

const havestSchema = new mongoose.Schema({
    
    publish_at:{
        type:Date,
        default: Date.now()
    },

    habest_date:{
        type:Date,
        default: Date.now()
    },

    title:String,

    content:String,

    user:{ 
        type: ObjectId,
        ref:"User",
        require: true
    },

    status:{
        type:String,
        default:"draft",
        enum:[
            "published",
            "draft"
        ]
    }
    
})


const havest = mongoose.model('havest', ProductSchema)

module.exports = havest