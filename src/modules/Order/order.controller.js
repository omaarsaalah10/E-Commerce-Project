import { cartModel } from "../../../db/model/cart.model.js";
import { orderModel } from "../../../db/model/order.model.js";


const placeOrder = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await cartModel.findOne({ user: userId }).populate("items.product", "price name");
    if (!cart) return res.status(400).json({ message: "Cart not found for this user" });
    if (cart.items.length === 0) return res.status(400).json({ message: "Cart is empty" });

    const invalidItems = cart.items.filter(item => !item.product);
    if (invalidItems.length > 0) {
      return res.status(400).json({
        message: "Some products in the cart no longer exist",
        invalidItems
      });
    }

    const totalPrice = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    const order = new orderModel({
      user: userId,
      products: cart.items.map(item => ({
        product: item.product._id,
        quantity: item.quantity
      })),
      totalPrice
    });

    await order.save();

    await cartModel.findOneAndDelete({ user: userId });

    res.status(201).json({ message: "Order placed successfully", order });

  } catch (error) {
    console.error("Place Order Error:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};





const deleteOrder = async (req , res) => {
    try {
    const { id } = req.params;
     const deletedOrder = await orderModel.findByIdAndDelete(id);
    if(!deletedOrder) return res.json({message: "Sorry, Can't Find Order"});
        res.json({message: "Deleted Order Successfully", deletedOrder});
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error });
    }
}


const updateStateOfOrder = async (req , res) => {
     
    try{
    const { id } = req.params;
     const { status } = req.body;
    
    if (status === "Canceled"){
        const order = await orderModel.findByIdAndDelete(id);
        if (!order) return res.json({message: "Order Not Found"});
        res.json({message: "Order Canceled and Deleted", order});
    }
    else if (status === "Completed") {
        const order = await orderModel.findByIdAndUpdate(id, {status: status}, {new: true});
        if (!order) return res.json({message: "Order Not Found"});
        res.json({message: "Order is Completed and Status is Delivered", order});
    }
    else {
        return res.json({message: "Error: Invalid Status"});
    }

    }catch (error) {
        res.status(500).json({ message: "Something went wrong", error });
    }
}

const getAllOrders = async (req , res) => {
    try {
    const orders = await orderModel.find();
        res.json({message: "All Orders Geted Successfuly" , orders});
    }catch (error) {
        res.status(500).json({ message: "Something went wrong", error });
    }
}

const getSpecificOrder = async (req , res) => {
    try{
    const { id } = req.params; 
    const order = await orderModel.findById(id);
    if(!order) return res.json({message: "Order Not Found"});
    res.json({message: "Order get Successfuly" , order});

    }catch (error) {
        res.status(500).json({ message: "Something went wrong", error });
    }
}


export {
    placeOrder,
    deleteOrder,
    updateStateOfOrder,
    getAllOrders,
    getSpecificOrder
}