import { Router } from "express";
import express from "express";
import { addMultipleToCart, deleteCart, getCart, updateQuantity } from "./cartr.controller.js";
import { verifyToken } from "../../middleware/VerifyToken.js";


export const cartRoutes = Router();
cartRoutes.use(express.json());


cartRoutes.get('/cart', verifyToken , getCart);
cartRoutes.post('/cart', verifyToken , addMultipleToCart);
cartRoutes.delete('/cart', verifyToken, deleteCart);
cartRoutes.put('/cart/:productId', verifyToken , updateQuantity);

