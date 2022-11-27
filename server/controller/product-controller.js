import mongoose from "mongoose";
import { client } from "../database/db.js";
import Product from "../model/product-schema.js";
import { UploadFiles, UploadChunks } from "../model/files-schema.js";


export const getProducts = async (request, response) => {
  try {
    client.get("products", async (err, cache) => {
      if (cache && JSON.parse(cache).length > 0) {
        // console.log("Cache hit")
        return response.status(200).json(JSON.parse(cache));
      } else {
        const products = await Product.find({});
        const files=await UploadFiles.find({});
        let decodedImages=[];
        files.forEach((file)=>{
            if (!file || file.length === 0) {
                return response.status(404).json({
                  err: "No file exists",
                });
              }   
              // Check if image
              if (!file.contentType === "image/jpeg" || !file.contentType === "image/png")  return response.status(404).json({err: "No valid image exists"});
        });
        const chunks = await UploadChunks.find({},{_id:0,data:1});  
        decodedImages=chunks.map((val)=>{ return Buffer.from(val.data).toString( "base64")}) 
        let p=products.map((product,idx)=>{
          return {...product._doc,productImage:decodedImages[idx]}
        })
          
        // console.log(p);
        // if(products.length>0)
        //     client.setex("products",1400,JSON.stringify(p))
        return response.status(200).json(p); 
      }
      }) 
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
};

export const getProductById = async (request, response) => {
  try {
    // console.log('Hie')
    const id = request.params.id;
    let productImage="";
    if (id) {
      client.get(`${id}`, async (err, cache) => {
        if (JSON.parse(cache)) {
          // console.log("Cache hit")
          return response.status(200).json(JSON.parse(cache));
        } else {
          // console.log("Cache Miss")
          const product = await Product.findOne({ _id: mongoose.Types.ObjectId(id)});
          if (product && product.image.data){
             const file=await UploadFiles.findOne({filename:product.image.data});
             if (!file || file.length === 0) {
                    return res.status(404).json({
                      err: "No file exists",
                    });
              }
      
              // Check if image
              if (file.contentType === "image/jpeg" || file.contentType === "image/png" ) {
                    const {data}=await UploadChunks.findOne({ files_id: mongoose.Types.ObjectId(file._id)},{data:1,_id:0});
                    productImage = Buffer.from(data).toString( "base64");  
              }
          }
          const modifiedProduct={...product._doc,productImage}
          // console.log(productImage)
          if(modifiedProduct)
              client.setex(`${id}`,1400,JSON.stringify(modifiedProduct))
         return response.status(200).json(modifiedProduct);
        }
      });
    } else {
      return response.status(404).json({ message: "No product found" });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (request, response) => {
  try {
    const { productId } = request.params;
    const { acknowledged } = await Product.deleteOne(
      {
        _id: mongoose.Types.ObjectId(productId),
      },
      {
        new: true,
      }
    );
    if (acknowledged)
      return response.status(200).json({ message: "delete successful" });
    else throw new Error("something went wrong.Please try again");
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: error.message });
  }
};
