import React, { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

const Login = ({ setuserName }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://fine-red-angler-wrap.cyclic.app/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.ok) {
          localStorage.setItem("token", response.token);
          console.log(response.userName, "this is user");
          setuserName(response?.userName);
          localStorage.setItem("userName", response.userName);
          // localStorage.setItem("token", JSON.stringify(response.token));
          console.log("Registration successful!");
          navigate("/products");
        } else {
          console.log(response.message);
          alert(response.message);
          console.error("Registration failed.");
        }
      })
      .catch((error) => {
        console.error("Error during registration:", error);
        alert(error.message);
      });
  };
  return (
    <div className="login-container">
      <h1>Welcome Back!</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="phone-number">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            name="phoneNumber"
            value={formData.phoneNumber}
            type="text"
            id="phoneNumber"
            required
            onChange={handleChange}
          />
        </div>
        <div className="password">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            value={formData.password}
            type="password"
            id="password"
            required
            onChange={handleChange}
          />
        </div>
        <button className="submit-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
