var mongoose = require('mongoose')
const Havest = require('../Models/havest')

exports.postHavest = async(req,res)=>{
    try {
        const havest = await Havest.create({
            content: req.body.content,
            title:req.body.title,
            user:req.body.user,
            price: req.body.price,
            status: req.body.status
        })
        await havest.populate("user", "username")
        res.send(havest)
    } catch (error) {
        
        return res.status(400).json({error : "Bad request"})
    }
}
exports.isHavest = async (req,res,next)=>{

    if(!req.params.id){
        return res.status(400).json({message:'ID is require'})
    }
    const havest = await Havest.findOne({_id:req.params.id}).populate('user');
    console.log(havest);
    if(!havest){
        return res.status(404).json({message:'Havest not found'}) 
    }
    req.havest = havest
    
    next()
}

exports.isHavester = async (req,res,next)=>{
    console.log(req.havest)
    if(req.havest.user == req.user._id){
      next()
    }  else{
      return res.status(403).json({message:"Update isn't allowed"}) 
  }
  }

exports.updateHavest = async(req,res)=>{
    try {
        const havestUp = await Havest.updateOne({_id:req.params.id},{$set:{
            content: req.body.content,
            title:req.body.title,
            user:req.body.user,
            price: req.body.price,
            status: req.body.status
    }})
    res.send(havestUp)
    } catch (error) {
        return res.status(400).json({error:"error in updating"});
    }
   

}

exports.IsAdmin = async(req,res,next)=>{
    if(req.user.IsAdmin === true){
        next()
    }else{
        return res.status(403).json({message:"deleted isn't allowed"}) 
    }
} 


exports.deleteHavest = async(req,res)=>{
    try {
        const havestDel = await Havest.deleteOne({_id:req.params.id})
        res.send(havestDel).status(200).json({message : "deleted with success"})
    } catch (error) {
        return res.status(400).json({error:"error in deleting"});
    }
}

exports.getHavests = async(req,res)=>{
    try {
        const havests = await Havest.find().populate("user","fullName")
        res.send(havests)
    } catch (error) {
        return res.status(404).json({error:"Havests not found"});

    }
}

exports.getHavestDetails = async(req,res)=>{
    try {
        const havest = await Havest.findOne({_id:req.params.id}).populate("user","fullName")
        res.send(havest)
    } catch (error) {
        return res.status(404).json({error:"Havest not found"});

    }
}