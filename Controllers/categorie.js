const Category = require('../Models/categorie')

    exports.createCategory = async (req,res)=>{
    const  category = await Category.create([
        {
            name:req.body.name, 
            code:req.body.code
        }
    ])
    res.send(category)
}