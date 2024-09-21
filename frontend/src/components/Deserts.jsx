import React, { useState, useEffect } from "react";
import axios from "axios";

const Dessert = () => {
  const [desserts, setDesserts] = useState([]);

  useEffect(() => {
    // API call to fetch dessert data from the Django backend
    axios.get("http://127.0.0.1:8000/api/dessert/")
      .then(response => {
        setDesserts(response.data);
      })
      .catch(error => {
        console.error("Error fetching dessert data:", error);
      });
  }, []);

  return (
    <div className="container my-5">
      <h2 className="mb-4">Dessert Menu</h2>
      <div className="row">
        {desserts.map((desert, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <div className="card">
              <img src={desert.image} className="card-img-top img-fluid" alt={desert.title} />
              <div className="card-body text-center">
                <h5 className="card-title">{desert.title}</h5>
                <p>{desert.text}</p>
                <p>Price: {desert.price}</p>
                <p>Rating: {desert.rating}/5</p>
                <p>Preparation time: {desert.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dessert;
