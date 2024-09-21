import React, { useState, useEffect } from "react";
import axios from "axios";

const Gujrati = () => {
  const [gujratiDishes, setGujratiDishes] = useState([]);

  useEffect(() => {
    // API call to fetch Gujrati dishes data from the Django backend
    axios.get("http://127.0.0.1:8000/api/gujrati/")
      .then(response => {
        setGujratiDishes(response.data);
      })
      .catch(error => {
        console.error("Error fetching Gujrati dishes data:", error);
      });
  }, []);

  return (
    <div className="container my-5">
      <h2 className="mb-4">Gujrati Menu</h2>
      <div className="row">
        {gujratiDishes.map((dish, index) => (
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

export default Gujrati;
