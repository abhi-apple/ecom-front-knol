import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/products");
    }
  }, []);

  return (
    <div>
      <div className="btns">
        <Link to="/login">
          <button className="login-btn">Login</button>
        </Link>

        <Link
          to="https://fine-red-angler-wrap.cyclic.app/login"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="register-btn">new</button>
        </Link>

        <Link to="/register">
          <button className="register-btn">Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
