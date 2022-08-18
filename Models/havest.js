const mongoose = require('mongoose')

const { ObjectId } = mongoose.Types

const ProductSchema = new mongoose.Schema({

    publish_at:{
        type:Date,
        default: Date.now()
    },
    habest_date:{
        type:Date,
        ref:"User",
        require:true
    },

    title:String,
    
    content:String,

    user:{ 

        type: ObjectId,

        ref:"User",

        require: true
    },

    price:{
        type:Number,
        ref:"User",
        require:true
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


const Post = mongoose.model('post', ProductSchema)

module.exports = Post