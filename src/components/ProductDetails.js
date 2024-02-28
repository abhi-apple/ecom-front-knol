import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/ProductDetails.css";
const ProductDetails = () => {
  const [product, setproduct] = useState([]);
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
        } else {
          const response = await fetch(
            `https://fine-red-angler-wrap.cyclic.app/api/products/${id}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            // console.log(data);
            setproduct(data.product);
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
          alert("Item already  in cart");
        }
      });
  };

  return (
    product?.images && (
      <div>
        <>
          <section className="py-2">
            <div className="container">
              <Link to="/products" className="backbtn">
                {" "}
                <button className="btn btn-primary shadow-0">Back</button>
              </Link>
              <div className="row gx-5">
                <aside className="col-lg-6">
                  <div className="border rounded-4 mb-3 d-flex justify-content-center">
                    <a
                      data-fslightbox="mygalley"
                      className="rounded-4"
                      target="_blank"
                      data-type="image"
                      href="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big.webp"
                    >
                      <img
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100vh",
                          margin: "auto",
                        }}
                        className="rounded-4 fit"
                        src={`${product?.images[0]}`}
                      />
                    </a>
                  </div>
                  <div className="d-flex justify-content-center mb-3">
                    {product?.images.map((url, index) => (
                      <a
                        key={index}
                        data-fslightbox="mygalley"
                        className="border mx-1 rounded-2"
                        target="_blank"
                        data-type="image"
                        href={url}
                      >
                        <img
                          width={60}
                          height={60}
                          className="rounded-2"
                          src={url}
                          alt={`Image ${index + 1}`}
                        />
                      </a>
                    ))}
                  </div>
                </aside>
                <main className="col-lg-6 whole-det">
                  <div className="ps-lg-3 details">
                    <h4 className="title text-dark">{product.title}</h4>

                    <div className="mb-3">
                      <span className="h5">${product.price}</span>
                    </div>
                    <div className=" mb-1 me-2">
                      <span className=" ratingcss ms-1">
                        {product.rating} ★ Rating
                      </span>
                    </div>

                    <p>{product.description}</p>

                    <hr />
                  </div>
                  <div className="buttons">
                    <button
                      onClick={handleClick}
                      className="btn btn-primary shadow-0"
                    >
                      {" "}
                      <i className="me-1 fa fa-shopping-basket" /> Add to cart{" "}
                    </button>
                  </div>
                </main>
              </div>
            </div>
          </section>
        </>
      </div>
    )
  );
};

export default ProductDetails;
