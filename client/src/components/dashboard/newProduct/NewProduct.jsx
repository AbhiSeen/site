import "./NewProduct.scss";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { addProducts } from "../../service/api";
import { useRef } from "react";

export default function NewProduct() {
  const image=useRef("https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg");
  const defaultProductInfo={
    name: "",
    stock: "",
    discount: "",
    mrp: "",
    description: "",
    image: "",
  }
  const [productInfo, setProductInfo] = useState({
    name: "",
    stock: "",
    discount: "",
    mrp: "",
    description: "",
    image: "",
  });
  const formData = new FormData();

  const addNewProduct = () => {
    formData.append("productInfo", JSON.stringify(productInfo));
    formData.append("image",image.current)
    const response = addProducts(formData);
    setProductInfo(defaultProductInfo);
    // console.log(image.current);
  }; 

  const handleChange = (type) => (event) => {
    setProductInfo((product) => ({ ...product, [type]: event.target.value }));
    // console.log(productInfo);
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>New Product</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
               productInfo.image 
                  ?  URL.createObjectURL(productInfo.image)
                  : image.current
              }
              alt="product-image"
            />
          </div>
          <div className="right">
            <form className="addProductForm" onSubmit={(e)=>e.preventDefault()}>
              <div className="addProductItem">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  name="image"
                  onChange={(e) =>{
                    image.current=e.target.files[0];
                    setProductInfo((product) => ({
                      ...product,
                      image: e.target.files[0],
                    }));
                  }
                  }
                  style={{ display: "none" }}
                />
              </div>
              <div className="addProductItem">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Apple Airpods"
                  onChange={handleChange("name")}
                  value={productInfo.name}
                />
              </div>
              <div className="addProductItem">
                <label>Category</label>
                <input
                  type="text"
                  placeholder="Ear budes"
                  onChange={handleChange("category")}
                  value={productInfo.name}
                />
              </div>
              <div className="addProductItem">
                <label>Stock</label>
                <input
                  type="text"
                  placeholder="123"
                  onChange={handleChange("stock")}
                  value={productInfo.stock}
                />
              </div>
              <div className="addProductItem">
                <label>Discount</label>
                <input
                  type="text"
                  placeholder="10%"
                  onChange={handleChange("discount")}
                  value={productInfo.discount}
                />
              </div>
              <div className="addProductItem">
                <label>MRP</label>
                <input
                  type="text"
                  placeholder="100"
                  onChange={handleChange("mrp")}
                  value={productInfo.mrp}
                />
              </div>
              <div className="addProductItem">
                <label>Description </label>
                <textarea
                  placeholder="add discription"
                  onChange={handleChange("description")}
                  value={productInfo.description}
                ></textarea>
              </div>
              <div>
              <button
                className="addProductButton"
                onClick={addNewProduct}
              >
                Create
              </button>
              </div>
             
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
