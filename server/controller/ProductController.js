import mongoose from 'mongoose';
import Product from '../models/Product.js';

export const getProducts = async (request, response) => {
    try {
        //Fetch all records from Product collection
        const products = await Product.find({})
        response.status(200).json({ message: "Products fetched successfully.", products: products });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

export const getProductDetails = async (request, response) => {
    try {
        let productId = request.params.id;
        let product;
        if(productId.includes("product")) {
            product = await Product.findOne({ id: productId });
        }
        else {
            productId = mongoose.Types.ObjectId(productId);
            product = await Product.findById(productId);
        }
        response.status(200).json(product);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}