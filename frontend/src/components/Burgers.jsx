import React, { useState, useEffect } from "react";
import axios from "axios";

const Burger = () => {
  const [burgers, setBurgers] = useState([]);

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

  return (
    <div className="container my-5">
      <h2 className="mb-4">Burger Menu</h2>
      <div className="row">
        {burgers.map((burger, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <div className="card">
              <img src={burger.image} className="card-img-top" style={{height:"100%", width:"100%"}} alt={burger.title} />
              <div className="card-body text-center">
                <h5 className="card-title">{burger.title}</h5>
                <p>{burger.text}</p>
                <p>Price: {burger.price}</p>
                <p>Rating: {burger.rating}/5</p>
                <p>Preparation time: {burger.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Burger;
