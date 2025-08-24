import { model, Schema } from "mongoose";



const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    category: String,
    image: String
},
    {
        timestamps: true,
        versionKey: false
    }
)


export const productModel = model("Product" , productSchema);