import React, { useState, useEffect } from "react";
import axios from "axios";

const Pizza = () => {
  const [pizza, setPizzas] = useState([]);

  useEffect(() => {
    // Fetch pizza data from Django API
    axios.get("http://127.0.0.1:8000/api/pizza/")
      .then((response) => {
        setPizzas(response.data);
      })
      .catch((error) => {
        console.error("Error fetching pizza data:", error);
      });
  }, []);

  return (
    <div className="container my-5">
      <h2 className="mb-4">Pizza Menu</h2>
      <div className="row">
        {pizza.map((pizza, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <div className="card">
              <img src={pizza.image} className="card-img-top img-fluid" alt={pizza.title} />
              <div className="card-body text-center">
                <h5 className="card-title">{pizza.title}</h5>
                <p>{pizza.text}</p>
                <p>Price: {pizza.price}</p>
                <p>Rating: {pizza.rating}/5</p>
                <p>Preparation time: {pizza.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pizza;
