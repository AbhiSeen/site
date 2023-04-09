import Product from "../model/product-schema.js";
import User from "../model/user-schema.js";
import mongoose from "mongoose";
import {INTERNAL_SERVER_ERROR} from "../Constants/response.js";
import { dataUri } from "../MulterConfig.js";
import { cloudinary } from "../cloudinaryConfig.js";


export const addProduct = async (request, response) => {
  try {
    // 
    if (request.body) {
        const file = dataUri(request).content;
        const result=await cloudinary.uploader.upload(file,{quality: "jpegmini"});
        const newProduct = new Product({...JSON.parse(request.body.productInfo),image:{url:result.url},category:"shirts"});
        newProduct.save();  
        return response.status(200).json({ message: "product added" });
    } 
  } catch (err) {
    console.log(err);
    return response
      .status(500)
      .json({ error: INTERNAL_SERVER_ERROR });
  }
};

export const getUsers = async (request, response) => {
  try {
    const users = await User.find({}, { fullName: 1, email: 1 });
    // console.log(users);
    return response.status(200).json(users);
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .json({ error: INTERNAL_SERVER_ERROR });
  }
};

export const getUserInfo = async (request, response) => {
  try {
    const userInfo = await User.findOne(
      { _id: mongoose.Types.ObjectId(request.params.id) },
      { username: 1, email: 1, phone: 1, fullName: 1 }
    );
    // console.log(users);
    return response.status(200).json(userInfo);
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .json({ error: INTERNAL_SERVER_ERROR });
  }
};

export const getOrders = async (request, response) => {
  try {
    if (request.query["id"]) {
      const result = await User.findOne(
        {
          _id: mongoose.Types.ObjectId(request.query["id"]),
        },
        {
          _id: 0,
          orders: 1,
          fullName: 1,
        }
      );
      // console.log(result)
      return response.status(200).json(result);
    }
    const orders = await User.find(
      {},
      {
        _id: 0,
        orders: 1,
        fullName: 1,
      }
    );
    return response.status(200).json(orders);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: INTERNAL_SERVER_ERROR });
  }
};
