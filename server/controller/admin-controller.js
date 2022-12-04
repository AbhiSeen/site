import Product from "../model/product-schema.js";
import User from "../model/user-schema.js";
import mongoose from "mongoose";
import {GridFsStorage} from "multer-gridfs-storage";
import multer from 'multer';
import crypto from "crypto";

export const middleware=(req, res, next)=> {
  var imageName, mimeType;

  const storage = new GridFsStorage({
    url: "mongodb+srv://abhi:QMovVAA2N2q3QdOE@cluster0.whvld.mongodb.net/?retryWrites=true&w=majority",
    file: (req, file) => {
      // console.log(file);
      imageName = file.originalname;
      mimeType = file.mimetype;
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = file.originalname;
          const fileInfo = {
            filename: filename,
            bucketName: "uploads",
          };
          resolve(fileInfo);
          console.log(fileInfo)
        });
      });
    },
  });

  var uploader = multer({ storage });

  var uploadFile = uploader.single("image");

  uploadFile(req, res, function (err) {
    req.imageName = imageName;
    req.uploadError = err;
    req.contentType = mimeType;
    next();
  });
}


export const addProduct = async (request, response) => {
  try {
    const productInfo=JSON.parse(request.body.productInfo);
    // console.log(request.body.productInfo.image);
    if (request.body) {
      const newProduct=new Product({
        ...productInfo,
        image:{
          data:request.imageName,
          contentType:request.contentType
        } 
      }) 
      newProduct.save();
      return response.status(200).json({ message: "product added" });
    }
   } catch (err) {
    console.log(err);
    return response
      .status(500)
      .json({ message: "some error occured.Please try again after some time" });
  }
};

export const getUsers = async (request, response) => {
  try {
    const users = await User.find({}, { fullName: 1, email: 1 });
    // console.log(users);
    return response.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

export const getUserInfofromId = async (request, response) => {
  try {
    const userInfo = await User.findOne(
      { _id: mongoose.Types.ObjectId(request.params.id) },
      { username: 1, email: 1, phone: 1, fullName:1 }
    );
    // console.log(users);
    return response.status(200).json(userInfo);
  } catch (error) {
    console.log(error);
  }
};

export const getOrders = async (request, response) => {
  try{
    if (request.params.id !== "undefined") {
      const result = await User.findOne(
        {
          _id: mongoose.Types.ObjectId(request.params.id),
        },
        {
          _id: 0,
          orders: 1,
          fullName:1 
        }
      );
      // console.log(result)
      return response.status(200).json(result);
    } else {
      const orders = await User.find(
        {},
        {
          _id: 0,
          orders: 1,
          fullName:1  
        }
      );
      return response.status(200).json({orders});
    }
  }catch(error){
    console.log(error);
    return response.status(500).json({message:"Something went wrong.Please try again"})
  }
};


