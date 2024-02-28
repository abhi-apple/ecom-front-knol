import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/ProductCard.css"; // Importing CSS file for styling

const ProductCard = ({ product, setmultiSelect, enableMulti }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();

    fetch("https://fine-red-angler-wrap.cyclic.app/api/users/additem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ id: product._id }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.ok) {
          alert("Item added to cart");
        } else {
          alert("Item already in cart");
        }
      });
  };
  const handleCheckboxChange = () => {
    if (setmultiSelect) {
      setmultiSelect((prevArray) => [...prevArray, product._id]);
    }
  };

  return (
    <div className={`product-card `}>
      {enableMulti && (
        <div className="">
          <input
            type="checkbox"
            checked={product.isSelected}
            onChange={handleCheckboxChange}
          />
        </div>
      )}
      <div className="product-whole">
        <div className="product-details">
          <Link to={`/product/${product._id}`}>
            <img
              src={product.images[0]}
              alt={product.title}
              className="product-image"
            />
          </Link>
          <div className="name-price">
            <h2 className="product-name">{product.title}</h2>
            <p className="product-price">${product.price}</p>
            <p className="product-rating">Rating : {product.rating}</p>
          </div>
        </div>
        <p className="product-description">{product.description}</p>
      </div>
      <button onClick={handleClick} className="add-to-cart">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
