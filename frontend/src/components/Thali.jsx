import React, { useState, useEffect } from "react";
import axios from "axios";

const Thali = () => {
  const [thalis, setThalis] = useState([]);

  useEffect(() => {
    // API call to fetch thali data from the Django backend
    axios.get("http://127.0.0.1:8000/api/thali/")
      .then(response => {
        setThalis(response.data);
      })
      .catch(error => {
        console.error("Error fetching thali data:", error);
      });
  }, []);

  return (
    <div className="container my-5">
      <h2 className="mb-4">Thali Menu</h2>
      <div className="row">
        {thalis.map((thali, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <div className="card">
              <img src={thali.image} className="card-img-top img-fluid" alt={thali.title} />
              <div className="card-body text-center">
                <h5 className="card-title">{thali.title}</h5>
                <p>{thali.text}</p>
                <p>Price: ${thali.price}</p>
                <p>Rating: {thali.rating}/5</p>
                <p>Preparation time: {thali.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Thali;
