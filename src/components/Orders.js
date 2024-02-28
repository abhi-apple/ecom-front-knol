import React, { useEffect, useState } from "react";
import ProductCartItem from "./ProductCartItem";
import "../styles/ProductCartItem.css";
import { Link, useNavigate } from "react-router-dom";

const Orders = () => {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState("User");
  const [totalsum, setTotalSum] = useState(0);
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
          setUsername(res.user.firstName);
          setData(res.user.orders);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchCartItems();
  }, []);

  const emptyOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        // navigate("/login");
      } else {
        const response = await fetch(
          "https://fine-red-angler-wrap.cyclic.app/api/users/emptyorders",
          {
            method: "POST",
            headers: {
              Authorization: token,
            },
          }
        );
        const res = await response.json();
        // After emptying orders, you may want to reset the orders data and trigger a re-render
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div>
      <div className=" cartMain col-lg-7">
        <div className="cartdetails">
          <div>
            <Link to="/products" className="backbtn">
              {" "}
              <button className="btn btn-primary shadow-0">Back</button>
            </Link>
            <h5 className="mb-3">
              <a href="#!" className="text-body">
                <i className="fas fa-long-arrow-alt-left me-2" />
                Thank You for Shopping!
                <br /> {username}
              </a>
            </h5>{" "}
            <button
              onClick={emptyOrders}
              className="btn btn-primary emptyord shadow-0"
            >
              Empty Orders
            </button>
          </div>

          {data.length > 0 &&
            data.map((item) => (
              <ProductCartItem
                setTotalSum={setTotalSum}
                key={item.id}
                item={item}
                page={null}
              />
            ))}
          <hr />
        </div>
        {/* 
        <div className="carttotal">
          <h5 className="mb-3">
            <a href="#!" className="text-body">
              Total
            </a>
          </h5>
          <p>${totalsum / 2}</p>
        </div> */}
      </div>
    </div>
  );
};

export default Orders;
