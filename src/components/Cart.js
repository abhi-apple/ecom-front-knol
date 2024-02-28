import React, { useEffect, useState } from "react";
import "../styles/Cart.css";
import ProductCartItem from "./ProductCartItem";
import { Link, useNavigate } from "react-router-dom";
const Cart = () => {
  const [data, setdata] = useState("");
  const [totalsum, settotalsum] = useState(0);
  const [allPrice, setallPrice] = useState([]);
  const [cartChange, setcartChange] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
        } else {
          const response = await fetch(
            "https://fine-red-angler-wrap.cyclic.app/api/users/userDetails",
            {
              method: "GET",
              headers: {
                Authorization: token,
              },
            }
          );
          const res = await response.json();
          console.log(res.user.cart);
          setdata(res.user.cart);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchCartItems();
  }, [cartChange]);

  const handlePlaceOrder = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "https://fine-red-angler-wrap.cyclic.app/api/users/placeorder",
      {
        method: "POST",
        headers: {
          Authorization: token,
        },
      }
    );
    const res = await response.json();
    console.log(res, "cart order");
    setdata(res?.user?.cart);
  };
  return (
    <div className=" cartMain col-lg-7">
      <div className="cartdetails">
        <div>
          <Link to="/products" className="backbtn">
            {" "}
            <button className="btn btn-primary shadow-0">Back</button>
          </Link>
          <h5 className="mb-3">
            <i className="fas fa-long-arrow-alt-left me-2" />
            Your Cart Items
          </h5>
        </div>

        <hr />
        <div className=" mb-4">
          <div>
            <p className="mb-1">Shopping cart</p>
            <p className="mb-0">You have {data.length} items in your cart</p>
          </div>
        </div>

        {data.length > 0 ? (
          data.map((item) => (
            <ProductCartItem
              settotalsum={settotalsum}
              setallPrice={setallPrice}
              setcartChange={setcartChange}
              key={item.id}
              item={item}
              page="cart"
            />
          ))
        ) : (
          <div>
            <p>Your cart is empty</p>
            <Link to="/products" className="btn btn-primary shadow-0">
              Back to Products
            </Link>
          </div>
        )}

        <hr />
      </div>

      <div className="carttotal">
        <h5 className="mb-3">
          <a href="#!" className="text-body">
            Total
          </a>
        </h5>
        <p>${totalsum / 2}</p>
      </div>
      {data.length > 0 && (
        <div>
          <Link to="/products/orders" className="">
            <button
              onClick={handlePlaceOrder}
              className="btn btn-primary shadow-0"
            >
              Place Order
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
