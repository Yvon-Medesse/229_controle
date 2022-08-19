const mongoose = require('mongoose')
const Schema = mongoose.Schema

const { ObjectId } = mongoose.Types
const CartItemSchema = new mongoose.Schema(
    {
        productId: { type: ObjectId, ref: "Product",require: true },
        name: String,
        price: Number,
        count: Number,
        
    }
);

const CartItem = mongoose.model("CartItem", CartItemSchema);

const OrderSchema = new mongoose.Schema(
    {
        products:[CartItemSchema],
        userId: { type: ObjectId, ref: "User",require: true },
        amount: { type: Number },
        productcount:Number,
        address: String,
        status: {
            type: String,
            default: "Not processed",
            enum: [
                "Not processed",
                "Processing",
                "Shipped",
                "Delivered",
                "Cancelled"
            ]
        }
    }
)

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order
