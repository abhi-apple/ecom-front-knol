import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Cart from "./components/Cart";
import Products from "./components/Products";
import Header from "./components/Header";
import ProductDetails from "./components/ProductDetails";
import Orders from "./components/Orders";
import { ThemeContextProvider } from "./context/ThemeContext";

function App() {
  const [category, setcategory] = useState(null);
  const [avgrating, setavgrating] = useState(null);
  const [filter, setfilter] = useState(null);
  const [searchText, setsearchText] = useState(null);
  const [userName, setuserName] = useState(null);
  // const { isDarkTheme, toggleTheme } = useTheme();
  useEffect(() => {
    // console.log(category, avgrating, filter);
  }, [category, avgrating, filter]);

  return (
    <ThemeContextProvider>
      <Router>
        <div className="App">
          <Header
            setcategoryw={setcategory}
            setfilterw={setfilter}
            setavgratingw={setavgrating}
            setsearchText={setsearchText}
            userName={userName}
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/login"
              element={<Login setuserName={setuserName} />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/products"
              element={
                <Products
                  category={category}
                  setcategory={setcategory}
                  filter={filter}
                  setfilter={setfilter}
                  avgrating={avgrating}
                  setavgrating={setavgrating}
                  searchText={searchText}
                />
              }
            />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/products/cart" element={<Cart />} />
            <Route path="/products/orders" element={<Orders />} />
          </Routes>
        </div>
      </Router>
    </ThemeContextProvider>
  );
}

export default App;
