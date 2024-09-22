// src/components/SouthIndian.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import API_BASE_URL from '../config';


const SouthIndian = () => {
  const [southIndianDishes, setSouthIndianDishes] = useState([]);
  const [userData, setUserData] = useState(null);
  const userId = userData?.data?.id;

  useEffect(() => {
    // API call to fetch South Indian dish data from the Django backend
    axios.get("http://127.0.0.1:8000/api/south/")
      .then(response => {
        setSouthIndianDishes(response.data);
      })
      .catch(error => {
        console.error("Error fetching South Indian dishes:", error);
      });
  }, []);

  const addToCart = (dish) => {
    console.log(dish, userId);

    axios.post('http://127.0.0.1:8000/api/add_to_cart/', {
      cart_details: dish,
      quantity: 1,
      user_id: userId,
    })
      .then(response => {
        console.log('Item added to cart successfully', response.data);
        alert('Item added to cart!');
      })
      .catch(error => {
        console.error('Error adding item to cart:', error);
      });
  };


  useEffect(() => {
    axios.get(`${API_BASE_URL}/check-authentication/`)
      .then(response => {
        setUserData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching carousel data!", error);
      });
  }, []);



  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h2 className="mb-4 text-center">South Indian Menu</h2>
        <div className="row">
          {southIndianDishes.map((dish, index) => (
            <div className="col-md-4 col-sm-6 mb-4" key={index}>
              <div className="card h-100">
                <img
                  src={dish.image}
                  className="card-img-top img-fluid"
                  alt={dish.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{dish.title}</h5>
                  <p className="card-text">{dish.text}</p>
                  <p><strong>Price:</strong> {dish.price}</p>
                  <p><strong>Rating:</strong> {dish.rating}/5</p>
                  <p><strong>Preparation time:</strong> {dish.time}</p>
                </div>
                <div className="text-center">
                  <button
                    className="btn btn-primary"
                    onClick={() => addToCart(dish)}  // Pass the dish object to addToCart function
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SouthIndian;
