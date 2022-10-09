import Product from "../model/product-schema.js";
import User from "../model/user-schema.js";
import mongoose from "mongoose";


export const addProducts = async (request, response) => {
    try {
      const {img,name,stock,discount,price,description} = request.body.product;
      if (request.body.product) {
        // console.log(orderedProducts)
        const result = await Product.insertMany([
          {
                img,
                name,
                stock,
                discount,
                price,
                description
          }
        ],
          { new: true }
        );
        console.log(result);
      }
      return response.status(200).json({ message: "ok" });
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({ message: "some error occured.Please try again after some time" });
    }
};


export const getUsers=async(request,response)=>{
  try {
    const users=await User.find({},{username:1,email:1});
    // console.log(users);
    return response.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
}
  

export const getUserInfofromId=async(request,response)=>{
  try {
    const userInfo=await User.findOne({_id:mongoose.Types.ObjectId(request.params.id)},{username:1,email:1,phone:1,firstname:1,lastname:1});
    // console.log(users);
    return response.status(200).json(userInfo);
  } catch (error) {
    console.log(error);
  }
}


export const getOrders = async (request,response) => {
  // console.log(request.params)
  if(request.params.id!=='undefined'){
  const orders = await User.find(
    {
      _id: mongoose.Types.ObjectId(request.params.id),
    },
    {
      _id: 0,
      orders: 1,
    }
  );
  console.log(orders)
  return response.status(200).json(...orders);
  }else{
    const orders = await User.find(
      {
      },
      {
        _id: 0,
        orders: 1,
      }
    );
    // console.log(...orders.flat(2))
    return response.status(200).json(...orders);
  }
};