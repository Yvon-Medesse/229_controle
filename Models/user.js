var mongoose = require("mongoose"),
    bcrypt = require("bcrypt"),
    Schema = mongoose.Schema;


var UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: true,
    },
    fullName: {
        type: String,
        trim: true,
        required: true,
    },
    hash_password: {
        type:String,
    },
    email: {
        type: String,
        unique: true,
        lowercase:true,
        trim:true,
        required:true,
    },
    IsAdmin:
    {
        type:Boolean,
        default:false
    
    }
});

UserSchema.methods.comparePassword = function (password){

    const result = bcrypt.compareSync(password, this.hash_password);
    return result;
   

};

const User = mongoose.model("User", UserSchema)

module.exports = User