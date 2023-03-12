import mongoose from "mongoose";
// import autoIncrement from 'mongoose-auto-increment';

const productSchema = new mongoose.Schema({
  image: {
    data: String,
    contentType: String,
  },
  name: { type: String, required: true },
  mrp: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  description: { type: String, required: true },
  discount: { type: Number, default: 0 },
  category:{type:String,required:true}
});

// autoIncrement.initialize(mongoose.connection);
// productSchema.plugin(autoIncrement.plugin, 'product');

const Product = mongoose.model("product", productSchema);

export default Product;
