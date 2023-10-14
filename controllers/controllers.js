const jwt = require('jsonwebtoken')
const user = require('../models/modelSchema')

const gentoken=(_id)=>{
    return jwt.sign({_id},process.env.KEY,{expiresIn:'3d'})
}
const usersignup =async(req,res)=>{
    const {fullname,email,role,password}=req.body
    try{
        
        const User =  await user.signup(fullname,email,role,password)
        const token = gentoken(User._id)
        res.status(200).json({fullname,email,role,token})
    } 
    catch(err){
        res.status(400).json({err:err.message})
    }
}

const userlogin = async(req,res)=>{
    const {fullname,email,role,password}=req.body
    try{
        if(role=="admin")
        {const User = await user.login(fullname,email,role,password)
        const token = gentoken(User._id)
        res.status(200).json({fullname,email,token,msg:"Access Granted"})}
        else{
            res.status(400).json({msg:"Access denied"})
        }
    }
    catch(err){
        res.status(400).json({err:err.message})
    }
}

module.exports={
    usersignup,
    userlogin
}
