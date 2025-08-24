import express from "express"
import { dbConnection } from "./db/dbConnection.js";
import { userRoutes } from "./src/modules/User/user.route.js";
import { productRoutes } from "./src/modules/Product/product.route.js";
import { cartRoutes } from "./src/modules/Cart/cart.coute.js";
import { orderRoutes } from "./src/modules/Order/order.route.js";


const app = express();

app.use(express.json());
app.use(userRoutes);
app.use(productRoutes);
app.use(cartRoutes);
app.use(orderRoutes);

dbConnection








app.listen(3000 , () => {
    console.log("Server Running in Port 3000");
    
})