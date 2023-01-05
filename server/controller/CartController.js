import mongoose from "mongoose";

import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const addItemToCart = async (request, response) => {
    try {
        const productId = mongoose.Types.ObjectId(request.body.productId);
        const existingCart = await Cart.findOne({ user_id: request.user._id });
        if(!existingCart) {
            const newCart = new Cart({
                user_id: request.user._id,
                state: "active",
                modifiedOn: Date.now(),
                products: [
                    {
                        _id: productId,
                        quantity: 1
                    }
                ]
            });
            await newCart.save();
        }
        else {
            //Searching sub-document i.e., product using id() method of sub-document array
            const existingProductInCart = await existingCart.products.id(productId);
            if(existingProductInCart) {
                existingProductInCart.quantity += 1;
            }
            else {
                existingCart.products.push({
                    _id: productId,
                    quantity: 1
                });
            }
            existingCart.modifiedOn = Date.now();
            await existingCart.save();
        }
        response.status(200).json({ message: "Item added to cart successfully." });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

export const getCartDetails = async (request, response) => {
    try {
        const existingCart = await Cart.findOne({ user_id: request.user._id });
        let allCartProducts = [];
        if(existingCart) {
            allCartProducts = await Promise.all(existingCart.products.map(async (product) => {
                try {
                    let currProduct = await Product.findById(product._id);
                    currProduct = { ...currProduct._doc, quantity: product.quantity };
                    return currProduct;
                } catch (error) {
                    response.status(500).json({ message: error.message });
                }             
            }));
        }
        response.status(200).json({ message: "Cart details fetched successfully.", cartItems: allCartProducts });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

export const removeCartItem = async (request, response) => {
    try {
        const productId = mongoose.Types.ObjectId(request.body.productId);
        const existingCart = await Cart.findOne({ user_id: request.user._id });
        existingCart.products.pull({
            _id: productId
        });
        existingCart.modifiedOn = Date.now();
        existingCart.totalCartPrice = request.body.remainingCartPriceToPay;
        await existingCart.save();
        response.status(200).json({ message: "Item removed from cart successfully." });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

export const updateCartDetails = async (request, response) => {
    try {
        const { cartItems, totalCartPriceToPay } = request.body;
        const existingCart = await Cart.findOne({ user_id: request.user._id });
        existingCart.products = [];
        cartItems.forEach(item => {
            item._id = mongoose.Types.ObjectId(item._id);
            existingCart.products.push(item);
        });
        existingCart.modifiedOn = Date.now();
        existingCart.totalCartPrice = totalCartPriceToPay;
        await existingCart.save();
        response.status(200).json({ message: "Cart updated successfully." });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

export const resetCartDetails = async (request, response) => {
    try {
        const existingCart = await Cart.findOne({ user_id: request.user._id });
        existingCart.modifiedOn = Date.now();
        existingCart.products = [];
        // To delete a key (totalCartPrice) of a document (existingCart) from Cart collection using
        // mongoose
        existingCart.totalCartPrice = undefined;
        await existingCart.save();
        response.status(200).json({ message: "Cart reset successfully." })
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}