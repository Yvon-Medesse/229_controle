const Product = require("../Models/product")

// Middleware
const productById = async (req,res,next)=>{
   
    try {
        const product = await Product.findOne({_id : req.params.id})
        if(!product){
            return res.status(404).json({error: "product not found."})
        }
        req.product = product
        next();
    } catch (error) {
        console.log(error);
        return res.status(404).json({error: "product not found"})

    }
   
}
const getProducts = async (req, res) => {
    const products = await Product.find().populate("category")
    res.send(products);
}

const getDetail = async (req, res) => {
  
        res.send(req.product);
   

}

const postProducts = async (req, res) => {
    if (!req.body.category) {
        return res.status(400).json({ error: "category is required" })
    }
    const product = await Product.create({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        stock: req.body.stock
    })
    console.log(req.body.category)
    await product.populate("category")
    res.send(product);
}

const updateProduct = async (req, res) => {
    console.log(req.product);
    try {
        if (req.body.name) {
            req.product.name = req.body.name
        }
        if (req.body.price) {
            req.product.price = req.body.price
        }
        await req.product.save()
        res.send(req.product);
    } catch (error) {
        res.status(404)
        res.send({ error: "Product doesn't exixt" })
    }

}
const addstock = async (req,res)=>{
    const products = await Product.updateMany({},{$set:[{"stock":10}]}) 
    res.send(products)
}

const removeProduct = async (req, res) => {
    try {
        const product = await Product.deleteOne({ _id: req.params.id })
        res.status(204).send(product);
    } catch (error) {
        res.status(404)
        res.send({ error: "Product doesn't exixt" })
    }


}

module.exports = { getProducts, getDetail, updateProduct, postProducts, productById, removeProduct,addstock }
