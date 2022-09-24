import "./NewProduct.scss";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";


export default function NewProduct() {
  const [file, setFile] = useState("");
  return (
    <div className="new">
    <Sidebar />
    <div className="newContainer">
      <Navbar />
      <div className="top">
        <h1>New Pro</h1>
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
          <input type="text" placeholder="Apple Airpods" />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <input type="text" placeholder="123" />
        </div>
        <div className="addProductItem">
          <label>Discount</label>
          <input type="text" placeholder="10%" />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input type="text" placeholder="100" />
        </div>
        <div className="addProductItem">
          <label>Discription </label>
          <textarea placeholder="add discription"></textarea>
        </div>
        
        
        <button className="addProductButton">Create</button>
      </form>
        </div>
      </div>
    </div>
  </div>
  );
}