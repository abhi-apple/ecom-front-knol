import React, { useEffect, useState } from "react";
import "../styles/ProductCartItem.css";
const ProductCartItem = ({
  item,
  settotalsum,
  page,
  setallPrice,
  setcartChange,
}) => {
  const [product, setproduct] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
        } else {
          const response = await fetch(
            `https://fine-red-angler-wrap.cyclic.app/api/products/${item}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          if (response.ok) {
            const one = await response.json();

            setproduct(one.product);

            settotalsum((prev) => prev + one.product.price);
            // setallPrice((prevPrices) => [...prevPrices, one.product.price]);
          } else {
            throw new Error("Failed to fetch products");
          }
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);
  const removeItemFromCart = async () => {
    fetch("https://fine-red-angler-wrap.cyclic.app/api/users/removeitem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        productId: item,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // Update total sum after item removal
          settotalsum((prev) => prev - product.price * 2);
          setcartChange((prevCartChange) => !prevCartChange);
        } else {
          console.error("Error removing item from cart");
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  return (
    product.images && (
      <div>
        <div className="card mb-3">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <div className="d-flex flex-row align-items-center">
                <div>
                  <img
                    src={product?.images[0]}
                    className="img-fluid rounded-3"
                    alt="Shopping item"
                    style={{ width: 65 }}
                  />
                </div>
                <div className="carttext ms-3">
                  <h5>{product.title}</h5>
                  <p className="small mb-0">{product.description}</p>
                </div>
              </div>
              <div className="btn-price">
                <div className="d-flex flex-row align-items-center">
                  <div style={{ width: 80 }}>
                    <h5 className="mb-0">${product.price}</h5>
                  </div>
                  <a href="#!" style={{ color: "#cecece" }}>
                    <i className="fas fa-trash-alt" />
                  </a>
                </div>
                {page && (
                  <div>
                    <button
                      onClick={removeItemFromCart}
                      className="btn btn-danger shadow-0"
                    >
                      Remove from Cart
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCartItem;
