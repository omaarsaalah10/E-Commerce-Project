import express from "express";
import { Router } from "express";
import { getAllProducts, getProduct, addProduct , updateProduct , deleteProduct} from "./product.controller.js";
import { verifyToken } from "../../middleware/VerifyToken.js";
import { isAdmin } from "../../middleware/isAdmin.js";




export const productRoutes = Router();
productRoutes.use(express.json());


productRoutes.get('/products' , getAllProducts);
productRoutes.get('/product/:id' , getProduct);
productRoutes.post('/product' , verifyToken , isAdmin , addProduct);
productRoutes.put('/product/:id' , verifyToken , isAdmin , updateProduct);
productRoutes.delete('/product/:id' , verifyToken , isAdmin , deleteProduct);
