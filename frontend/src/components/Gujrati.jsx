import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config';
import Navbar from "./Navbar";


const Gujrati = () => {
  const navigate = useNavigate();

  const [gujratiDishes, setGujratiDishes] = useState([]);
  const [userData, setUserData] = useState(null);
  const userId = userData?.data?.id;

  useEffect(() => {
    axios.get(`${API_BASE_URL}/check-authentication/`, { withCredentials: true })
      .then(response => {
        console.log("Response Data:", response.data);
        setUserData(response.data);
      })
      .catch(error => {
        navigate('/');
        alert("Please! Login first or Create Account on our website")
        console.error("There was an error fetching the data!", error);
      });

    // API call to fetch Gujrati dishes data from the Django backend
    axios.get(`${API_BASE_URL}/gujrati/`)
      .then(response => {
        setGujratiDishes(response.data);
      })
      .catch(error => {
        console.error("Error fetching Gujrati dishes data:", error);
      });
  }, []);

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


  const addToCart = (dish) => {
    console.log(dish, userId);

    axios.post(`${API_BASE_URL}/add_to_cart/`, {
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

  return (
    <div className="container">
      {/* Check if userData is null */}
      {userData === null ? (
        <div className="row justify-content-center">
          <Navbar />
          <h4 className="text-center mt-5">Please login first</h4>
        </div>
      ) : (
        <>
          <Navbar />
          <div className="container my-5">
            <h2 className="mb-4 text-center">Gujrati Menu</h2>
            <div className="row">
              {gujratiDishes.map((dish, index) => (
                <div className="col-md-4 col-sm-6 mb-4" key={index}>
                  <div className="card h-100">
                    <img
                      src={dish.image}
                      className="card-img img-fluid"
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
      )}
    </div>
  );
};

export default Gujrati;
