import { model, Schema } from "mongoose";

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    age: Number,
    isConfirmed: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: "user",
        enum: ["user" , "admin"]
    },

    },


    {
        timestamps: true,
        versionKey: false
    }
)


export const userModel = model("User" , userSchema);
