import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Login from "./user/Login";
import axios from 'axios';
import API_BASE_URL from "../config"
axios.defaults.withCredentials = true;


const Navbar = () => {
  const [login, setLogin] = useState(false)
  const [showModal, setShowModal] = useState(false);

  const [userData, setUserData] = useState(null);

  // go on top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // for carousel slides
  useEffect(() => {
    axios.get(`${API_BASE_URL}/check-authentication/`)
      .then(response => {
        setUserData(response.data);
        setLogin(true)
      })
      .catch(error => {
        console.error("There was an error fetching carousel data!", error);
      });
  }, []);


  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);


  return (
    <>
      {!login &&
        <>
          <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
            <div className="container">
              <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link" onClick={handleShow} data-bs-toggle="modal" data-bs-target="#loginModal">Log in</a>
                  </li>
                </ul>

                <div>
                  <Link className="navbar-brand text-danger font-weight-bold" to="/">
                    Foodify
                  </Link>
                </div>

                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Sign up
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </>
      }


      {/* Main Navbar for Navigation */}
      {
        login &&
        <>
          < nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
            <div className="container-fluid">
              <Link className="navbar-brand text-danger font-weight-bold" to="/">
                Foodify
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarScroll"
                aria-controls="navbarScroll"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarScroll">
                <ul className="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/about">
                      About Us
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/contact">
                      Contact Us
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/menu">
                      Menu
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/cart">
                      Cart
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/reviews">
                      Reviews
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav >
        </>
      }


      <Login />
    </>
  );
};

export default Navbar;
