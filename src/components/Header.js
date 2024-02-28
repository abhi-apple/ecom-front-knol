import React, { useState } from "react";
import "../styles/Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Header = ({
  setcategoryw,
  setfilterw,
  setsearchText,
  setavgratingw,
  userName,
}) => {
  const navigate = useNavigate();
  const { isDarkTheme, toggleTheme } = useTheme();

  const [category, setCategory] = useState(null);
  const [averageRating, setAverageRating] = useState(null);
  const [filter, setFilter] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setsearchText(searchQuery);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const handleAverageRatingSelect = (selectedRating) => {
    setAverageRating(selectedRating);
  };

  const handleFilterSelect = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const handleClearFilter = () => {
    setCategory(null);
    setAverageRating(null);
    setFilter(null);
    setcategoryw(null);
    setavgratingw(null);
    setfilterw(null);
  };
  const handleCart = () => {
    navigate("/products/cart");
  };
  const handleOrder = () => {
    navigate("/products/orders");
  };
  const handleLogOut = () => {
    alert("Logged out");
    localStorage.clear();
    window.location.reload();
    // redirect("/");
    navigate("/");
  };
  const handleFilterButton = () => {
    setcategoryw(category);
    setavgratingw(averageRating);
    setfilterw(filter);
  };

  return (
    <div
      className={
        isDarkTheme ? "dark-header navbarnav" : "light-header navbarnav"
      }
    >
      <div className=" navlogo">
        <Link to={"/"} className="navbar-brand">
          <img
            src="https://static.vecteezy.com/system/resources/previews/003/092/544/original/e-commerce-logo-with-pointer-and-shopping-bag-free-vector.jpg"
            alt="Knolskape"
            className="img-comp"
          />
        </Link>
      </div>
      <div className="navbardet " id="navbarSupportedContent">
        <ul className="navbar-nav optionsnav ">
          <li className="nav-item dropdown each-op">
            <button
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {category === null
                ? "Category"
                : category === "smartphones"
                ? "Smartphones"
                : category === "laptops"
                ? "Laptops"
                : category === "fragrances"
                ? "Fragrances"
                : category === "skincare"
                ? "Skincare"
                : "Category"}
              {/* {console.log(category)} */}
            </button>
            <ul className="dropdown-menu">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCategorySelect("smartphones")}
                >
                  Smartphones
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategorySelect("laptops")}
                  className="dropdown-item"
                >
                  Laptops
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategorySelect("fragrances")}
                  className="dropdown-item"
                >
                  Fragrances
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategorySelect("skincare")}
                  className="dropdown-item"
                >
                  Skincare
                </button>
              </li>
            </ul>
          </li>
          <li className="nav-item dropdown each-op">
            <button
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {averageRating === null
                ? "Average Rating"
                : averageRating === "Above 4.5 rating"
                ? "Above 4.5 rating"
                : averageRating === "Above 4 rating"
                ? "Above 4 rating"
                : averageRating === "Above 3.5 rating"
                ? "Above 3.5 rating"
                : averageRating === "Above 3 rating"
                ? "Above 3 rating"
                : "Average Rating"}
            </button>
            <ul className="dropdown-menu">
              <li>
                <button
                  onClick={() => handleAverageRatingSelect("Above 4.5 rating")}
                  className="dropdown-item"
                >
                  Above 4.5 rating
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleAverageRatingSelect("Above 4 rating")}
                  className="dropdown-item"
                >
                  Above 4 rating
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleAverageRatingSelect("Above 3.5 rating")}
                  className="dropdown-item"
                >
                  Above 3.5 rating
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleAverageRatingSelect("Above 3 rating")}
                  className="dropdown-item"
                >
                  Above 3 rating
                </button>
              </li>
            </ul>
          </li>
          <li className="nav-item dropdown each-op ">
            <button
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {filter === null
                ? "Filter"
                : filter === "Price high to low"
                ? "Price H-L"
                : filter === "Price low to high"
                ? "Price L-H"
                : filter === "Average customer ratings"
                ? "Avg. rating"
                : "Filter"}
            </button>
            <ul className="dropdown-menu">
              <li>
                <button
                  onClick={() => handleFilterSelect("Price high to low")}
                  className="dropdown-item"
                >
                  Price High to Low
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleFilterSelect("Price low to high")}
                  className="dropdown-item"
                >
                  Price low to high
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleFilterSelect("Average customer ratings")}
                  className="dropdown-item"
                >
                  Average customer ratings
                </button>
              </li>
            </ul>
          </li>
          <button onClick={handleFilterButton} className=" apply-filter">
            Apply Filter
          </button>
          <button onClick={handleClearFilter} className="apply-filter ">
            Clear Filter
          </button>
        </ul>
        {/* Search form */}
        <form className="d-flex" role="search" onSubmit={handleSubmit}>
          <input
            className={
              isDarkTheme
                ? "form-control searchBar dark-mode"
                : "form-control searchBar light-mode"
            }
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchQuery}
            onChange={handleInputChange}
          />
          <button
            className="btn btn-outline-success apply-filter"
            type="submit"
          >
            Search
          </button>
        </form>
        {/* Buttons */}
        <div className="buttons">
          {userName ? (
            <button className="btn btn-warning apply-filter">
              Hello! {userName}
            </button>
          ) : localStorage.getItem("userName") ? (
            <button className="btn btn-warning apply-filter">
              Hello! {localStorage.getItem("userName")}
            </button>
          ) : (
            <Link to={"/login"} className="navbar-brand">
              <button className=" apply-filter">Sign In</button>
            </Link>
          )}

          <button onClick={handleOrder} className=" apply-filter">
            Orders
          </button>
          <button onClick={handleCart} className=" apply-filter">
            Cart
          </button>
          <div className="toggle-theme">
            <button onClick={toggleTheme} className="apply-filter">
              {isDarkTheme ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
          <button onClick={handleLogOut} className=" apply-filter">
            LogOut
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
