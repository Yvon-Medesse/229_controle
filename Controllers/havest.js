const mongoose = require('mongoose')
const Havest = require('../Models/havest')

exports.getHavests = async (req,res) =>{
    const havest =await Havest.find({},{title:1,status:1,_id:1})
    res.send(havest)
}

exports.getHavestDetail = async (req,res) =>{
    const havest =await Havest.findOne({_id:req.params.id})
    res.send(havest)
}
exports.createHavest = async (req, res) => {
    try {
        const havest = await Havest.create({
            publish_at: req.body.publish_at,
            habest_date: req.body.habest_date,
            content: req.body.content,
            title: req.body.title,
            user: req.user,
            price: req.body.price,
            status: req.body.status
        })
        await havest.populate('user',"userName fullname email")
    res.send(havest)
    } catch (error) {
        return res.status(400).json({error : "Bad request"})
    }
    
}

exports.updateHavest = async (req,res)=>{

    try{
            const havest = await Havest.updateOne({
                _id:req.params.id          
            },{$set:{
                publish_at: req.body.publish_at,
                habest_date: req.body.habest_date,
                content: req.body.content,
                title: req.body.title,
                user: req.user,
                price: req.body.price,
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
        return res.status(404).json({message:'Havest not found'}) 
    }
    req.havest = havest
    
    next()
}

exports.isHavester = async (req,res,next)=>{
  if(req.havest.user === req.user._id){

    next()
  }  else{
    return res.status(403).json({message:"Update isn't allowed"}) 
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
        const havest = await Havest.deleteOne({_id: req.params.id})
        res.status(204).send(havest)
    } catch (error) {
        return res.status(404).json({error:"delete isn't allowed"})
    }
}
