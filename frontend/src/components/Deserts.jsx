import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import Navbar from "./Navbar";

const Dessert = () => {
  const [desserts, setDesserts] = useState([]);

  const [userData, setUserData] = useState(null);

  const [cartItems, setCartItems] = useState([]);
  const userId = userData?.data?.id;

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
        <h2 className="mb-4">Dessert Menu</h2>
        <div className="row">
          {desserts.map((dessert, index) => (
            <div className="col-md-4 col-sm-6 mb-4" key={index}>
              <div className="card h-100">
                <img
                  src={dessert.image}
                  className="card-img-top img-fluid"
                  alt={dessert.title}
                  style={{ height: "200px", objectFit: "cover" }} />
                <div className="card-body text-center">
                  <h5 className="card-title">{dessert.title}</h5>
                  <p className="card-text">{dessert.text}</p>
                  <p><strong>Price:</strong> {dessert.price}</p>
                  <p><strong>Rating:</strong> {dessert.rating}/5</p>
                  <p><strong>Preparation time:</strong> {dessert.time}</p>
                </div>
                <div className="text-center">
                  <button
                    className="btn btn-primary"
                    onClick={() => addToCart(dessert)}  // Pass the dish object to addToCart function
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

export default Dessert;
