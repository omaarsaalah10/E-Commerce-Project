import { Router } from "express";
import express from "express"
import { checkEmail } from "../../middleware/cheakEmail.js";
import { deleteUser, getAllUsers, login, register, updateUser, verifyAccount } from "./user.controller.js";
import { verifyToken } from "../../middleware/VerifyToken.js";
import { isAdmin } from "../../middleware/isAdmin.js";



export const userRoutes = Router();
userRoutes.use(express.json());


userRoutes.get('/users' ,verifyToken  , isAdmin , getAllUsers);

userRoutes.post('/user/login'  , login);

userRoutes.post('/user' , checkEmail , register);

userRoutes.put('/user/:id' ,verifyToken , isAdmin,  updateUser)

userRoutes.delete('/user/:id' , verifyToken , isAdmin , deleteUser)

userRoutes.get('/user/verify/:email' ,verifyAccount)


