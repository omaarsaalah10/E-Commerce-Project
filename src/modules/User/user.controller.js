import { userModel } from "../../../db/model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendMail } from "../../../utilities/Email/sendMails.js";


const getAllUsers = async (req , res) => {
    try {
        const users = await userModel.find();
        res.json({messgae: "All Users Get Successfuly" , users});
    } catch (error) {
        res.json({message: "Error", error});
    }
}

const register = async(req, res)=>{
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 8)
        const addedUser = await userModel.insertOne(req.body)
        sendMail(req.body.email)
        addedUser.password = undefined
        res.json({message:"registered successfully", addedUser})
    } catch (error) {
        res.json({message: "Error", error});
    }
}

const login = async (req , res) => {
    try {
        const exist = await userModel.findOne({email: req.body.email});
        if (!exist) return res.json({message: "User Not Found , Please Register"});
    
        const matched = bcrypt.compareSync(req.body.password , exist.password);
        if(!matched) return res.json({message: "Email or Passwoed Invalid"});
        const token = jwt.sign({_id:exist._id , role:exist.role} , "ntig13");
        if(exist.isConfirmed === false) return res.json({message: "Email is Not Confirmed,Please Confirme"});
            res.json({message: `Welcome ${exist.name}` , token});
    } catch (error) {
        res.json({message: "Error", error});
    }
}

const updateUser = async (req , res) => {
    try {
        const {id} = req.params;
        const updatedUser = await userModel.findByIdAndUpdate (id , {...req.body} , {new:true})
        res.json({message: "Updated Successfuly" , updatedUser});   
    } catch (error) {
        res.json({message: "Error", error});
    }
}

const deleteUser = async (req , res) => {
    try {
        const {id} = req.params;
        const deletedUser = await userModel.findByIdAndDelete(id);
        res.json({message: "Deleted Successfuly" , deletedUser});
    } catch (error) {
        res.json({message: "Error", error});
    }
}

const verifyAccount = async(req,res)=>{
    try {
        let {email} =  req.params
        jwt.verify(email, "NTIG13Mail", async(err,decoded)=>{
            if(err) return res.json({message:"invalid token",err})
            await userModel.findOneAndUpdate({email:decoded.email}, {isConfirmed:true})
            res.json({message:"confirmed successfully"})
        })
    } catch (error) {
        res.json({message: "Error", error});
    }
}



export {
    getAllUsers,
    register,
    login,
    updateUser,
    deleteUser,
    verifyAccount
}
