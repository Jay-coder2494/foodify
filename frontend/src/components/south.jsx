// src/components/SouthIndian.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const SouthIndian = () => {
  const [southIndianDishes, setSouthIndianDishes] = useState([]);

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

  return (
    <div className="container my-5">
      <h2 className="mb-4">South Indian Menu</h2>
      <div className="row">
        {southIndianDishes.map((dish, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <div className="card">
              <img src={dish.image} className="card-img-top img-fluid" alt={dish.title} />
              <div className="card-body text-center">
                <h5 className="card-title">{dish.title}</h5>
                <p>{dish.text}</p>
                <p>Price: {dish.price}</p>
                <p>Rating: {dish.rating}/5</p>
                <p>Preparation time: {dish.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SouthIndian;
