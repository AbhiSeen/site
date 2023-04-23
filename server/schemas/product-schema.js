import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
  image: {
    url:String
  },
  name: { type: String, required: true },
  mrp: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  description: { type: String, required: true },
  discount: { type: Number, default: 0 },
  category:{type:String,required:true}
});


const Product = mongoose.model("product", productSchema);

export default Product;
