import React from "react";
import { useNavigate } from "react-router-dom";

const RestaurantCategories = () => {
  const navigate = useNavigate();

  const categories = [
    { name: "Pizza", imgUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D" },
    { name: "Burgers", imgUrl: "https://b.zmtcdn.com/data/dish_photos/190/9d63666b7e22f117989c535cad8fb190.jpg" },
    { name: "Gujrati", imgUrl: "https://images.unsplash.com/photo-1645432524528-ae76145f67b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGd1amFyYXRpJTIwZGVzaGVzfGVufDB8fDB8fHww" },
    { name: "Desserts", imgUrl: "https://b.zmtcdn.com/data/dish_photos/ab4/a266bf78389da2ff0f6790798aadaab4.jpeg" },
    { name: "Thali", imgUrl: "https://b.zmtcdn.com/data/dish_photos/de1/dea2d32a045598c69cf8289e70c94de1.jpg" },
    { name: "South-indian", imgUrl: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ];

  const sendToApi = (cat) => {
    if (cat === "Pizza") {
      navigate("/pizza");
    } else if (cat === "Burgers") {
      navigate("/burger");
    }
    else if (cat === "Gujrati") {
      navigate("/gujrati");
    }
    else if(cat === "Desserts"){
      navigate("/desert")
    }
    // You can add more else-if conditions for other categories (e.g., "Gujrati", "Desserts", etc.)
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4">Explore Popular Categories</h2>
      <div className="row">
        {categories.map((category, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <div className="card">
              <img src={category.imgUrl} className="card-img-top img-fluid" alt={category.name} />
              <div className="card-body text-center">
                <button
                  type="button"
                  onClick={() => sendToApi(category.name)} // Handle click for each category
                  className="btn btn-light text-dark w-100"
                >
                  <h5 className="card-title">{category.name}</h5>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantCategories;
