import mongoose from 'mongoose';
import Product from '../model/product-schema.js';

export const getProducts = async (request, response) => {
    try {
        const products = await Product.find({});

        response.json(products);
    }catch (error) {
    response.status(500).json({message: error.message})
    }
}


export const getProductById = async (request, response) => {
    try {
        // console.log('Hie')
        const products = await Product.findOne({ 'id': request.params.id });
        response.json(products);
    }catch (error) {
        response.status(500).json({message: error.message})
    }
}