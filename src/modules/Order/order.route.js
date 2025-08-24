import express from "express";
import { Router } from "express";
import { deleteOrder, getAllOrders, getSpecificOrder, placeOrder, updateStateOfOrder } from "./order.controller.js";
import { verifyToken } from "../../middleware/VerifyToken.js";
import { isAdmin } from "../../middleware/isAdmin.js";
import jwt from "jsonwebtoken";




export const orderRoutes = Router();
orderRoutes.use(express.json());

orderRoutes.get('/orders' , verifyToken , isAdmin , getAllOrders)
orderRoutes.get('/order/:id' , verifyToken , isAdmin , getSpecificOrder)
orderRoutes.post('/order' , verifyToken , placeOrder);
orderRoutes.put('/order/:id' , verifyToken , isAdmin , updateStateOfOrder)
orderRoutes.delete('/order/:id' , verifyToken , isAdmin , deleteOrder)