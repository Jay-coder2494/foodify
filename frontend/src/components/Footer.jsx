import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-4">
      <div className="container">
        <p>© 2024 Foodify | All Rights Reserved</p>
        <p>Follow us on:</p>
        <a href="#" className="text-white mx-2">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="#" className="text-white mx-2">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="#" className="text-white mx-2">
          <i className="fab fa-twitter"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
