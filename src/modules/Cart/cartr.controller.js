import { cartModel } from "../../../db/model/cart.model.js";


// const addToCart = async (req , res) => {
    
//     const { productId, quantity } = req.body;
//     let cart = await cartModel.findOne({ user: req.user._id });

        
//     if(!cart)
//         cart = await cartModel.insertOne({user:  req.user._id, items:[{product: productId , quantity: quantity || 1}]});
//     else{
//         cart.items.push({product: productId, quantity: quantity || 1});
//         await cart.save();
//     }
//     res.json({message: "Items Added Successfuly" , cart});

// }



const addMultipleToCart = async (req, res) => {
  try {
    const { items } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items provided" });
    }

    let cart = await cartModel.findOne({ user: req.user._id });

    if (!cart) {
      cart = await cartModel.create({
        user: req.user._id,
        items: items.map(i => ({
          product: i.product, 
          quantity: i.quantity || 1
        }))
      });
    } else {
      items.forEach(i => {
        const existingItem = cart.items.find(
          item => item.product.toString() === i.product 
        );

        if (existingItem) {
          existingItem.quantity += i.quantity || 1;
        } else {
          cart.items.push({ product: i.product, quantity: i.quantity || 1 }); 
        }
      });

      await cart.save();
    }

    res.json({ message: "Items Added Successfully", cart });
  } catch (error) {
    res.json({ message: "Something went wrong", error });
  }
};



const getCart = async (req , res) => {
    try{
    let cart = await cartModel.findOne({ user: req.user._id }).populate("items.product");
    if(!cart) return res.json({message: "Cart is Empty"});
        res.json({message: "Cart Itmes Retrieved Successfuly" , cart});
    } catch (error) {
        res.json({ message: "Something went wrong", error });
    }
}


const deleteCart = async (req, res) => {
    try{
    const userId = req.user._id;
    const cart = await cartModel.findOneAndDelete({ user: userId });
    if (!cart) return res.json({ message: "Cart Not Found" });
        res.json({ message: "Cart Deleted..." });
    } catch (error) {
        res.json({ message: "Something went wrong", error });
    }
}



const updateQuantity = async (req, res) => {
    try{
    const { productId } = req.params;
    const { action } = req.body; 

    let cart = await cartModel.findOne({ user: req.user._id });
    if (!cart) return res.json({ message: "Cart not found" });

    let item = cart.items.find(i => i.product.toString() === productId);
    if (!item) return res.json({ message: "Product not found in cart" });

    if (action === "inc") {
        item.quantity++;
    } else if (action === "dec") {
        item.quantity--;
        if (item.quantity <= 0) {
            cart.items = cart.items.filter(i => i.product.toString() !== productId);
        }
    }

    await cart.save();
    return res.json({ message: "Success", cart });
    }
    catch (error) {
        res.json({ message: "Something went wrong", error });
    }
}


export {
    addMultipleToCart,
    getCart,
    deleteCart,
    updateQuantity
}