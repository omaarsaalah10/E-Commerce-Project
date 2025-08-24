import {userModel} from "../../db/model/user.model.js"


export const checkEmail = async (req , res , next) => {
    const exists = await userModel.findOne({email: req.body.email})
    if(exists) return res.json({message: "The  Email Already Exist , Please login"})
        next()
}