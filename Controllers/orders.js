const fs = require('fs')
const Order = require("../Models/orders")
// Middleware
const orderById = async (req, res, next) => {

    try {
        const product = await Order.findOne({ _id: req.params.id })
        if (!product) {
            return res.status(404).json({ error: "product not found." })
        }
        req.product = product
        next();
    } catch (error) {
        console.log(error);
        return res.status(404).json({ error: "product not found" })

    }

}
const getOrders = async (req, res) => {
    const products = await Order.find()
    console.log(products.length);
    res.send(products);
}

const getOrderDetail = async (req, res) => {
    const orders = await Order.find()
    res.send(orders)
    orders.map(async (item) =>{
        item.products.map(async (item) =>{
            const product = await Order.find()
            console.log(item.name);
        })
        
        
        
    })
    
  


}

const postOrders = async (req, res) => {
    if (!req.body.products[0]) {
        return res.status(400).json({ error: "product is required" })
        
    }
    let amount = 0
    let productcount = 0

    var prodcts = req.body.products
    prodcts.map(item => {
        amount += item.price * item.count

    })

   productcount = prodcts.length
    
    const product = await Order.create({
        products: req.body.products,
        productcount:productcount,
        userId: req.body.userId,
        amount: amount,
        address: req.body.address,
        status: req.body.status
    })
    await product.populate("userId")

    

    var createFacture = async (file, value) => {


        await fs.writeFile(file, value, (error) => {
    
    
            if (error) {
                console.log(error)
            }
            else {
                console.log("file is create") 
            }
    
        });
    
    
    }
const generateFacture = async() => {

        const prod = await Order.find().populate("userId")
        let chemin = `./factures/${product.userId.fullName}`
     prod.forEach(element=>{
           element.products.map(item=>{
            let content = `Nom du Client :  ${product.userId.fullName}
            Qte :  ${item.count}, Nom du Produit : ${item.name}, Prix : ${item.price} =  ${item.count * item.price} 
            `
            createFacture(chemin,content)
           })
          
         
           
         })
         
        }
        generateFacture()

    
    
    
    res.send(product);
}


const updateOder = async (req, res) => {
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

const removeOrder = async (req, res) => {
    try {
        const product = await Order.deleteOne({ _id: req.params.id })
        res.status(204).send(product);
    } catch (error) {
        res.status(404)
        res.send({ error: "Product doesn't exixt" })
    }


}

const bigOrder = async (req,res) =>{
    const last = await Order.find({productcount:{$gt:req.productcount}}).limit(3).sort({ productcount:-1,_id:-1})
    res.send(last)
}
module.exports = { getOrders, getOrderDetail, updateOder, postOrders, orderById, removeOrder,bigOrder }
