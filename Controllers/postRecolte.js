const mongoose = require('mongoose')
const Post = require('../Models/havest')

exports.getPosts = async (req,res) =>{
    const posts =await Post.find({},{title:1,status:1,_id:1})
    res.send(posts)
}

exports.getPostDetail = async (req,res) =>{
    const post =await Post.findOne({_id:req.params.id})
    res.send(post)
}
exports.createPost = async (req, res) => {
    try {
        const posts = await Post.create({
            title: req.body.title,
            price:req.body.price,
            content: req.body.content,
            user: req.user,
            status: req.body.status
        })
        await posts.populate('user',"userName fullName email")
    res.send(posts)
    } catch (error) {
        return res.status(400).json({error : "Bad request"})
    }
    
}

exports.updatePost = async (req,res)=>{    
 

    try{
            const post = await Post.updateOne({
                _id:req.params.id          
            },{$set:{
                title: req.body.title,
                price: req.body.price,
                content: req.body.content,
                status: req.body.status
            }})
                res.send(post);
        }catch(error){
                return res.status(400).json({error:"Post is undefind"});
        }
}

exports.isPost = async (req,res,next)=>{

    if(!req.params.id){
        return res.status(400).json({message:'ID is require'})
    }
    const post = await Post.findOne({_id:req.params.id});
    if(!post){
        return res.status(404).json({message:'Post not found'}) 
    }
    req.post = post
    
    next()
}

exports.isPoster = async (req,res,next)=>{
  if(req.post.user === req.user._id){

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

exports.deletePost = async(req,res)=>{
    try {
        const post = await Post.deleteOne({_id: req.params.id})
        res.status(204).send(post)
    } catch (error) {
        return res.status(404).json({error:"delete isn't allowed"})
    }
}
