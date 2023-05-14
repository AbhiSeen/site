import React from "react";
import "./categoryStyle.css";
import Header from "../header/Header";
import { useSelector } from "react-redux";
const CategoryPage = ({ navigation }) => {
  console.log({ navigation });
  const { product } = useSelector((state) => state.getProductDetails);
  return (
    <>
      <Header />
      <div class="row">
        <div class="col-4">
          <img src="https://i.ibb.co/47Sk9QL/product-1.jpg" alt="" />
          <h4>Red Printed T-shirt</h4>
          <div class="rating">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="far fa-star"></i>
          </div>
          <p>₹500.00</p>
        </div>

        <div class="col-4">
          <img src="https://i.ibb.co/b7ZVzYr/product-2.jpg" alt="" />
          <h4>Red Printed T-shirt</h4>
          <div class="rating">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
          </div>
          <p>₹500.00</p>
        </div>

        <div class="col-4">
          <img src="https://i.ibb.co/KsMVr26/product-3.jpg" alt="" />
          <h4>Red Printed T-shirt</h4>
          <div class="rating">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star-half-alt"></i>
          </div>
          <p>₹500.00</p>
        </div>

        <div class="col-4">
          <img src="https://i.ibb.co/0cMfpcr/product-4.jpg" alt="" />
          <h4>Red Printed T-shirt</h4>
          <div class="rating">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
          </div>
          <p>₹500.00</p>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <img src="https://i.ibb.co/47Sk9QL/product-1.jpg" alt="" />
          <h4>Red Printed T-shirt</h4>
          <div class="rating">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="far fa-star"></i>
          </div>
          <p>₹500.00</p>
        </div>

        <div class="col-4">
          <img src="https://i.ibb.co/b7ZVzYr/product-2.jpg" alt="" />
          <h4>Red Printed T-shirt</h4>
          <div class="rating">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
          </div>
          <p>₹500.00</p>
        </div>

        <div class="col-4">
          <img src="https://i.ibb.co/KsMVr26/product-3.jpg" alt="" />
          <h4>Red Printed T-shirt</h4>
          <div class="rating">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star-half-alt"></i>
          </div>
          <p>₹500.00</p>
        </div>

        <div class="col-4">
          <img src="https://i.ibb.co/0cMfpcr/product-4.jpg" alt="" />
          <h4>Red Printed T-shirt</h4>
          <div class="rating">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
          </div>
          <p>₹500.00</p>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <img src="https://i.ibb.co/bQ5t8bR/product-5.jpg" alt="" />
          <h4>Red Printed T-shirt</h4>
          <div class="rating">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="far fa-star"></i>
          </div>
          <p>₹500.00</p>
        </div>

        <div class="col-4">
          <img src="https://i.ibb.co/vVpTyBD/product-6.jpg" alt="" />
          <h4>Red Printed T-shirt</h4>
          <div class="rating">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
          </div>
          <p>₹500.00</p>
        </div>

        <div class="col-4">
          <img src="https://i.ibb.co/hR5FGwH/product-7.jpg" alt="" />
          <h4>Red Printed T-shirt</h4>
          <div class="rating">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star-half-alt"></i>
          </div>
          <p>₹500.00</p>
        </div>

        <div class="col-4">
          <img src="https://i.ibb.co/QfCgdXZ/product-8.jpg" alt="" />
          <h4>Red Printed T-shirt</h4>
          <div class="rating">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
          </div>
          <p>₹500.00</p>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <img src="https://i.ibb.co/nw5xZwk/product-9.jpg" alt="" />
          <h4>Red Printed T-shirt</h4>
          <div class="rating">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="far fa-star"></i>
          </div>
          <p>₹500.00</p>
        </div>

        <div class="col-4">
          <img src="https://i.ibb.co/9HCsmjf/product-10.jpg" alt="" />
          <h4>Red Printed T-shirt</h4>
          <div class="rating">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
          </div>
          <p>₹500.00</p>
        </div>

        <div class="col-4">
          <img src="https://i.ibb.co/JQ2MBHR/product-11.jpg" alt="" />
          <h4>Red Printed T-shirt</h4>
          <div class="rating">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star-half-alt"></i>
          </div>
          <p>₹500.00</p>
        </div>

        <div class="col-4">
          <img src="https://i.ibb.co/nRZMs6Y/product-12.jpg" alt="" />
          <h4>Red Printed T-shirt</h4>
          <div class="rating">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
          </div>
          <p>₹500.00</p>
        </div>
      </div>
      <div class="page-btn">
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>&#8594;</span>
      </div>
    </>
  );
};

export default CategoryPage;
