var mongoose = require("mongoose"),
    bcrypt = require("bcrypt"),
    Schema = mongoose.Schema;


var UserSchema = new Schema({
    userName: {
        type: String,
        trim: true,
        required: true,
    },
    fullName: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase:true,
        trim:true,
        required:true,
    },
    hash_password: {
        type:String,
    },
    
    isAdmin:
    {
        type:Boolean,
        default:false,
        require:true,
        trim:true
    
    }
});

UserSchema.methods.comparePassword = function (password){

    const result = bcrypt.compareSync(password, this.hash_password);
    return result;
    // return bcrypt.compareSync(password, this.hash_password);
 //   console.log(result);

};

const User = mongoose.model("User", UserSchema)

module.exports = User