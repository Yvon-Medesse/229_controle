const mongoose = require('mongoose')
const Havest = require('../Models/havest')

exports.getHavests = async (req,res) =>{
    const havests =await Havest.find({},{title:1,status:1,_id:1})
    res.send(havests)
}

exports.getHavestDetail = async (req,res) =>{
    const havest =await Havest.findOne({_id:req.params.id})
    res.send(havest)
}
exports.createHavest = async (req, res) => {
    try {
        const havests = await Havest.create({
            title: req.body.title,
            content: req.body.content,
            user: req.user,
            status: req.body.status
        })
        await havests.populate('user',"userName email")
    res.send(havests)
    } catch (error) {
        return res.status(400).json({error : "Bad request"})
    }
    
}

exports.updateHavest = async (req,res)=>{

    try{
            const havest = await Havest.updateOne(
                {_id:req.params.id          
                },{$set:{
                title: req.body.title,
                content: req.body.content,
                status: req.body.status
            }})
                res.send(havest);
        }catch(error){
                return res.status(400).json({error:"Havest is undefind"});
        }
}

exports.isHavest = async (req,res,next)=>{

    if(!req.params.id){
        return res.status(400).json({message:'ID is require'})
    }
    const havest = await Havest.findOne({_id:req.params.id});
    if(!havest){
        return res.status(404).json({message:'havest not found'}) 
    }
    req.havest = havest
    
    next()
}

exports.isHavester = async (req,res,next)=>{
  if(req.havest.user === req.user._id){
    next()
  }  else{
    return res.status(403).json({message:"Update isn\'t allowed"}) 
}
}

exports.isAdmin = async(req,res,next)=>{
    if(req.user.isAdmin === true){
        next()
    }else{
        return res.status(403).json({message:"deleted isn't allowed"}) 
    }
} 

exports.deleteHavest = async(req,res)=>{
    try {
        if (req.User.isAdmin === true) {
            const havest = await Havest.deleteOne({_id: req.params.id})
                res.status(204).send(havest)  
        }
        else{
            return res.status(404).json({error:"delete isn\'t allowed"})
        }
    } catch (error) {
        return res.status(404).json({error:"delete isn\'t allowed"})
    }
}
