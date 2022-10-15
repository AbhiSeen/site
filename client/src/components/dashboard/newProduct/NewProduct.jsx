import "./NewProduct.scss";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { addProducts } from "../../service/api";


export default function NewProduct() {
  const [file, setFile] = useState("");
  const [productInfo,setProductInfo]=useState({
    name:"",
    stock:"",
    discount:"",
    price:"",
    description:"",
    image:""
  });


  const addNewProduct=async(event)=>{
      event.preventDefault();
      const response=await addProducts(productInfo);
      console.log(productInfo)
      
  }

  const handleChange=(type)=>(event)=>{
    setProductInfo((product)=>({...product,[type]:event.target.value}))
    // console.log(productInfo);
  }

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
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
        <div className="right">
        <form className="addProductForm">
        <div className="addProductItem">
        <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
        </div>
        <div className="addProductItem">
          <label>Name</label>
          <input type="text" placeholder="Apple Airpods" onChange={handleChange("name")} />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <input type="text" placeholder="123" onChange={handleChange("stock")} />
        </div>
        <div className="addProductItem">
          <label>Discount</label>
          <input type="text" placeholder="10%" onChange={handleChange("discount")} />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input type="text" placeholder="100"  onChange={handleChange("price")}/>
        </div>
        <div className="addProductItem">
          <label>Description </label>
          <textarea placeholder="add discription" onChange={handleChange("description")}></textarea>
        </div>       
        <button className="addProductButton" onClick={addNewProduct}>Create</button>
      </form>
        </div>
      </div>
    </div>
  </div>
  );
}