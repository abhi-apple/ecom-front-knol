import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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

    fetch("https://fine-red-angler-wrap.cyclic.app/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.ok) {
          console.log("Registration successful!");
          navigate("/login");
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
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="input-field">
          <label htmlFor="firstName">First Name</label>
          <input
            value={formData.firstName}
            onChange={handleChange}
            type="text"
            name="firstName"
            id="firstName"
            required
          />
        </div>
        <div className="input-field">
          <label htmlFor="lastName">Last Name</label>
          <input
            value={formData.lastName}
            onChange={handleChange}
            type="text"
            name="lastName"
            id="lastName"
            required
          />
        </div>
        <div className="input-field">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            value={formData.phoneNumber}
            onChange={handleChange}
            name="phoneNumber"
            id="phoneNumber"
            required
          />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={handleChange}
            id="password"
            required
            name="password"
          />
        </div>
        <button className="submit-button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
