const mongoose = require('mongoose')
const Havest = require('../Models/havest')

exports.getHavest = async (req,res) =>{
    const havests =await Havest.find({},{title:1,status:1,_id:1,price:1,habest_date:1,pubilsh_at:1})
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
            price:req.body.price,
            user: req.user,
            status: req.body.status,
            habest_date: req.body.habest_date
        })
        
        await havests.populate('user',"userName email isAdmin")
    res.send(havests)
    } catch (error) {
        
        return res.status(400).json({error : "Bad request"})
    }
    
}

exports.updateHavest = async (req,res)=>{


    try{  
        const havest = req.havest;
        havest.title= req.body.title;
        havest.content= req.body.content;
        havest.price=req.body.price;
        havest.user= req.user;
        havest.status= req.body.status;
        havest.habest_date= req.body.habest_date;
    
        havest.save();
        res.send(havest)
    }catch(error){
        return res.status(400).json({error:"Post is undefind"});
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

exports.isPoster = async (req,res,next)=>{
  if(req.havest.user == req.user._id){
   next()
  }  else{
    return res.status(403).json({message:"Update isn't allowed"}) 
  }
}

exports.isAdmin = async(req,res,next)=>{
   
    if(req.user.isAdmin == true){
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
