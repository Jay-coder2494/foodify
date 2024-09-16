import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import RestaurantCategories from "./Restaurant";

const Homepage = () => {
  return (
    <div>
      <Navbar />


      {/* hero section */}
      <div className="hero-section d-flex justify-content-center align-items-center">
        <div className="text-center">
          <div className="container mt-5">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-4 font-weight-bold text-warning">Welcome to Foodify</h1>
                <p className="lead text-warning">
                  Satisfy your cravings with delicious food delivered to your doorstep!
                </p>
              </div>
            </div>
          </div>
          <div className="search-bar mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search for restaurants or cuisines..."
            />
            <button className="btn btn-danger mt-3">Search</button>
          </div>
        </div>
      </div>

      <RestaurantCategories />

      <Footer />
    </div>
  );
};

export default Homepage;
