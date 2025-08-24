import  jwt  from "jsonwebtoken";
import { userModel } from "../../db/model/user.model.js";

export const isAdmin = (req , res , next) => {
    if(!req.isAdmin) {
        return res.status(403).json({message: "Access Denied"});
    }
    next();
};
