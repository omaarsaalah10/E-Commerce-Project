import  mongoose, { model, Schema } from "mongoose";


const orderSchema = new Schema({
    
    totalPrice: Number,
    status: {
        type: String,
        enum: ["Pending" , "Completed" , "Canceled"],
        default: "Pending"
    },

    user:{
        type: mongoose.Types.ObjectId,
        ref: "User"
    },

    products: [
        {   
            product:{
            type: mongoose.Types.ObjectId,
            ref: "Product"},
            quantity: {
                type: Number,
                default: 1
            }
        }
    ]
}
,
    {
        timestamps: true,
        versionKey: false
    }
)

export const orderModel = model("Order" , orderSchema)