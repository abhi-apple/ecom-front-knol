import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import "../styles/Products.css";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Products = ({ category, filter, avgrating, searchText }) => {
  const [products, setProducts] = useState([]);
  const [multiSelect, setmultiSelect] = useState([]);
  const [enableMulti, setenableMulti] = useState(false);
  const [allProducts, setallProducts] = useState([]);
  const { isDarkTheme, toggleTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
        } else {
          const requestBody = {
            category: category,
            filter: filter,
            rating: avgrating,
          };
          console.log(requestBody);
          const response = await fetch(
            "https://fine-red-angler-wrap.cyclic.app/api/products/filter",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: token,
              },
              body: JSON.stringify(requestBody),
            }
          );

          if (response.ok) {
            const data = await response.json();

            setProducts(data.products);
            setallProducts(data.products);
            setIsLoading(false);
            console.log(data, "filtered products");
          } else {
            setIsLoading(false);
            throw new Error("Failed to fetch products");
          }
        }
      } catch (error) {
        navigate("/login");
        setIsLoading(false);
        console.error("Error fetching products:", error);
      }
    };

    fetchFilteredProducts();
  }, [category, filter, avgrating, multiSelect]);

  useEffect(() => {
    const handleSearch = () => {
      const results = allProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(searchText?.toLowerCase()) ||
          product.description.toLowerCase().includes(searchText?.toLowerCase())
      );

      setProducts(results);
      console.log(results, "after search");
    };

    handleSearch();
  }, [searchText]);

  const handleAddAllToCart = () => {
    console.log(multiSelect, "these are prod selected");
    setmultiSelect([]);
    setenableMulti(false);

    const itemOccurrences = new Map();
    multiSelect.forEach((itemId) => {
      itemOccurrences.set(itemId, (itemOccurrences.get(itemId) || 0) + 1);
    });

    const oddOccurrences = multiSelect.filter(
      (itemId) => itemOccurrences.get(itemId) % 2 === 1
    );

    console.log(oddOccurrences, "odd repeating items");

    let successfulAdditions = 0;

    oddOccurrences.forEach((itemId) => {
      fetch("https://fine-red-angler-wrap.cyclic.app/api/users/additem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ id: itemId }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.ok) {
            // Handle success
            successfulAdditions++;
            console.log("Item added to cart:", itemId);
            // Check if all items are successfully added
            if (successfulAdditions === oddOccurrences.length) {
              alert("All items added to cart successfully");
            }
          } else {
            // Handle error
            alert("Item already added to cart");
            console.error("Failed to add item to cart:", itemId);
          }
        })
        .catch((error) => {
          console.error("Error occurred while adding item to cart:", error);
        });
    });

    setProducts(products.map((product) => ({ ...product, isSelected: false })));
  };

  const handleMultiSelect = () => {
    setenableMulti(!enableMulti);
  };

  console.log(products, "this is search prod ");
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className={isDarkTheme ? "dark-header " : "light-header "}>
          <div className="btns-multi">
            <button onClick={handleMultiSelect} className="add-to-cart">
              Add Multiple Items
            </button>
            <button onClick={handleAddAllToCart} className="add-to-cart">
              Add All To Cart
            </button>
          </div>
          <div className="productCard">
            {products.map((product) => (
              <ProductCard
                enableMulti={enableMulti}
                setmultiSelect={setmultiSelect}
                key={product._id}
                product={product}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
