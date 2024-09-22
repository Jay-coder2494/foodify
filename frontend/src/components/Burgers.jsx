import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import API_BASE_URL from '../config';


const Burger = () => {
  const [burgers, setBurgers] = useState([]);
  const [userData, setUserData] = useState(null);
  const userId = userData?.data?.id;



  useEffect(() => {
    // API call to fetch burger data from the Django backend
    axios.get("http://127.0.0.1:8000/api/burger/")
      .then(response => {
        setBurgers(response.data);
      })
      .catch(error => {
        console.error("Error fetching burger data:", error);
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


  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h2 className="mb-4">Burger Menu</h2>
        <div className="row">
          {burgers.map((burger, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <div className="card">
                <img src={burger.image} className="card-img-top" style={{ height: "100%", width: "100%" }} alt={burger.title} />
                <div className="card-body text-center">
                  <h5 className="card-title">{burger.title}</h5>
                  <p>{burger.text}</p>
                  <p>Price: {burger.price}</p>
                  <p>Rating: {burger.rating}/5</p>
                  <p>Preparation time: {burger.time}</p>
                </div>
                <div className="text-center">
                  <button
                    className="btn btn-primary"
                    onClick={() => addToCart(burger)}  // Pass the dish object to addToCart function
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

export default Burger;
