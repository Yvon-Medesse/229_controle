const mongoose = require('mongoose')

const { ObjectId } = mongoose.Types

const HavestSchema = new mongoose.Schema({
    pubilsh_at:{
        type:Date,
        default: Date.now()
    },
    habest_date:{
        type:Date,
        required: true
    },
    title:String,
    content:String,
    user:{ 

        type: ObjectId,
        ref:"User",
        require: true
    },
    price: {
        type: Number,
        require: true,
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

const Havest = mongoose.model('havest', HavestSchema)

module.exports = Havest