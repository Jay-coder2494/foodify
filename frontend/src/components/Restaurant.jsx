import React from "react";

const RestaurantCategories = () => {
  const categories = [
    { name: "Pizza", imgUrl: "https://via.placeholder.com/150" },
    { name: "Burgers", imgUrl: "https://via.placeholder.com/150" },
    { name: "Asian", imgUrl: "https://via.placeholder.com/150" },
    { name: "Desserts", imgUrl: "https://via.placeholder.com/150" },
    { name: "Indian", imgUrl: "https://via.placeholder.com/150" },
    { name: "Italian", imgUrl: "https://via.placeholder.com/150" },
  ];

  return (
    <div className="container my-5">
      <h2 className="mb-4">Explore Popular Categories</h2>
      <div className="row">
        {categories.map((category, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <div className="card">
              <img src={category.imgUrl} className="card-img-top" alt={category.name} />
              <div className="card-body text-center">
                <h5 className="card-title">{category.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantCategories;
