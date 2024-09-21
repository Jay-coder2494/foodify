import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

const Dessert = () => {
  const [desserts, setDesserts] = useState([]);

  const [userData, setUserData] = useState(null);

  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(1); // Use the actual user ID here

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/cart/?user_id=${userId}`);
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };
    fetchCartData();
  }, [userId]);


  useEffect(() => {
    // API call to fetch dessert data from the Django backend
    axios.get("http://127.0.0.1:8000/api/desert/")
      .then(response => {
        setDesserts(response.data);
      })
      .catch(error => {
        console.error("Error fetching dessert data:", error);
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

  return (
    <div className="container my-5">
      <h2 className="mb-4">Dessert Menu</h2>
      <div className="row">
        {desserts.map((dessert, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <div className="card">
              <img src={dessert.image} className="card-img-top img-fluid" alt={dessert.title} />
              <div className="card-body text-center">
                <h5 className="card-title">{dessert.title}</h5>
                <p>{dessert.text}</p>
                <p>Price: {dessert.price}</p>
                <p>Rating: {dessert.rating}/5</p>
                <p>Preparation time: {dessert.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dessert;
