import mongoose from "mongoose";
import { client } from "../database/db.js";
import Product from "../model/product-schema.js";
import { UploadFiles, UploadChunks } from "../model/files-schema.js";
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
      if (cache) {
        console.log("Cache hit");
        const cachedProduct = JSON.parse(cache);
        if (product.name.includes(cachedProduct))
          return response.status(200).json(JSON.parse(cache));
        else {
          console.log("Cache Miss");
          if (product && product.image.data) {
            let productImage = "";
            const file = await UploadFiles.findOne({ filename: product.image.data });
            if (!file || file.length === 0)
              return response.status(404).json({ err: "No file exists" });
            // Check if image
            if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
              const { data } = await UploadChunks.findOne(
                { files_id: mongoose.Types.ObjectId(file._id) },
                { data: 1, _id: 0 }
              );
              productImage = Buffer.from(data).toString("base64");
            }
            const modifiedProduct = { ...product._doc, productImage };
            if (modifiedProduct) client.setex(`${id}`, 1400, JSON.stringify(modifiedProduct));
            // console.log(productImage)
            return response.status(200).json(modifiedProduct);
          } else {
            return response.status(404).json({ message: "No product found" });
          }
        }
      } else {
        console.log("Cache Miss");
        if (product && product.image.data) {
          let productImage = "";
          const file = await UploadFiles.findOne({ filename: product.image.data });
          if (!file || file.length === 0)
            return response.status(404).json({ err: "No file exists" });
          // Check if image
          if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
            const { data } = await UploadChunks.findOne(
              { files_id: mongoose.Types.ObjectId(file._id) },
              { data: 1, _id: 0 }
            );
            productImage = Buffer.from(data).toString("base64");
          }
          const modifiedProduct = { ...product._doc, productImage };
          if (modifiedProduct) client.setex(`${id}`, 1400, JSON.stringify(modifiedProduct));
          // console.log(productImage)
          return response.status(200).json(modifiedProduct);
        } else {
          return response.status(404).json({ message: "No product found" });
        }
      }
    } else {
      const cache = await client.get("products");
      const dbproducts = await Product.find({});
      if (cache) {
        const cachedProducts = JSON.parse(cache);
        const isCached = isinCache(dbproducts, cachedProducts);
        if (isCached) {
          console.log("Cache hit");
          return response.status(200).json(cachedProducts);
        } else {
          if (dbproducts && dbproducts.length > 0) {
            const files = await UploadFiles.find({});

            if (!files[0] || files[0].length === 0)
              return response.status(404).json({ error: "No file exists" });

            if (!files[0].contentType === "image/jpeg" || !files[0].contentType === "image/png")
              return response.status(404).json({ err: "No valid image exists" });

            const chunks = await UploadChunks.find({}, { _id: 0, data: 1 });

            const decodedImages = chunks.map((val) => {
              return Buffer.from(val.data).toString("base64");
            });

            const products = dbproducts.map((product, idx) => {
              return { ...product._doc, productImage: decodedImages[idx] };
            });

            // console.log(p)
            if (products && products.length > 0) {
              client.setex("products", 1400, JSON.stringify(products));
            }

            return response.status(200).json(products);
          } else {
            return response.status(200).json({ message: "No products found" });
          }
        }
      } else {
        if (dbproducts && dbproducts.length > 0) {
          const files = await UploadFiles.find({});

          if (!files[0] || files[0].length === 0)
            return response.status(404).json({ error: "No file exists" });

          if (!files[0].contentType === "image/jpeg" || !files[0].contentType === "image/png")
            return response.status(404).json({ err: "No valid image exists" });

          const chunks = await UploadChunks.find({}, { _id: 0, data: 1 });

          const decodedImages = chunks.map((val) => {
            return Buffer.from(val.data).toString("base64");
          });

          const products = dbproducts.map((product, idx) => {
            return { ...product._doc, productImage: decodedImages[idx] };
          });

          // console.log(p)
          if (products && products.length > 0) {
            client.setex("products", 1400, JSON.stringify(products));
          }

          return response.status(200).json(products);
        } else {
          return response.status(200).json({ message: "No products found" });
        }
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
