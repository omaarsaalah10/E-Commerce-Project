import jwt from "jsonwebtoken";


export const verifyToken = async (req , res , next) => {
    
    const matched = jwt.verify(req.headers.token , "ntig13");

    if(!matched) return res.json({message: "invalid Token"})

        req.user = matched;
        req.isAdmin = matched.role === "admin";
        next();
}