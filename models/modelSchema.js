const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:[true,"email exist in DB!"],
        required:[true,"email not provided"],
        lowercase:true,
        trim:true,
    },
    role:{
        type:String,
        required:true,
        enum:["admin","normal"]
    },
    password:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

userSchema.statics.signup = async function(fullname,email,role, password){
    if (!fullname||!email ||!role|| !password) {
      throw Error("All fields must be filled");
    }
    if (!validator.isEmail(email)) {
      throw Error("Not a valid Email");
    }
    if (!validator.isStrongPassword(password)) {
      throw Error("password not strong enough")
    }
  
    const checkEmail = await this.findOne({ email })
  
    if (checkEmail) {
      throw Error("Email already exists");
    }
  
    const salting = await bcrypt.genSalt(10);
    const hashing = await bcrypt.hash(password, salting);
  
    const emp = await this.create({ fullname,email,role, password: hashing });
  
    return emp;
  };
  
  userSchema.statics.login = async function(fullname,email,role,password){
    if (!fullname||!email ||!role|| !password){
      throw Error("All fields must be filled");
    }
  
    const user = await this.findOne({ email });
  
    if (!user) {
      throw Error("Email not found in DB!");
    }
  
    const compare = await bcrypt.compare(password, user.password);
  
    if (!compare) {
      throw Error("Password did not matched");
    }
    if(role!="admin"){
        throw Error("access denied!")
    }
  
    return user;
  };
  
  
module.exports = mongoose.model("user",userSchema)