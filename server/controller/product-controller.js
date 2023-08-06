import mongoose from "mongoose";
import { client } from "../database/db.js";
import Product from "../schemas/product-schema.js";
import { INTERNAL_SERVER_ERROR } from "../Constants/response.js";

const isinCache = (cachedProducts, dbproducts) => {
  if (cachedProducts.length > 0 && dbproducts.length > 0) {
    const productNames = dbproducts.map((product) => product.name);
    return cachedProducts.every((val) => productNames.includes(val.name));
  }
};

export const getProducts = async (request, response) => {
  try {
    if (request.query["id"]) {
      const id = request.query["id"];
      const cache = await client.get(`${id}`);
      const product = await Product.findOne({ _id: mongoose.Types.ObjectId(id) });
      const cachedProduct=cache ? JSON.parse(cache) : {};
      if(product){
        const isCached=product._id.equals(cachedProduct._id);
        if (isCached) {
            const ttl= await client.ttl(`${id}`);
            ttl > 0 && client.expire(`${id}`,ttl+1400);
            return response.status(200).json(cachedProduct);
        } else {
            client.setex(`${id}`, 1400, JSON.stringify(product));
            return response.status(200).json(product);
        }
      }else{
        return response.status(200).json({ message: "No products found" });
      } 
    } else {
      const cache = await client.get("products");
      const dbproducts = await Product.find({});
      const cachedProducts = cache ? JSON.parse(cache):[];
      const isCached = isinCache(dbproducts, cachedProducts);
      if(dbproducts && dbproducts.length > 0){
        if (isCached) {
            const ttl= await client.ttl("products");
            ttl > 0 && client.expire("products",ttl+1400);
            return response.status(200).json(cachedProducts);
        } else {
            client.setex("products", 1400, JSON.stringify(dbproducts));
            return response.status(200).json(dbproducts);
        }
      }else{
        return response.status(200).json({ message: "No products found" });
      }  
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: INTERNAL_SERVER_ERROR });
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
    if (acknowledged) return response.status(200).json({ message: "delete successful" });
    else throw new Error(INTERNAL_SERVER_ERROR);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: error.message });
  }
};
