import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-transparent py-3 sticky-top position-relative">
      <div 
        className="position-absolute top-0 end-0 h-100 d-none d-lg-block" 
        style={{ width: '58.333%', backgroundColor: '#ebebeb', zIndex: 0 }}
      ></div>

      <div className="container-fluid px-4 px-lg-5 ms-lg-4 d-flex justify-content-between align-items-center position-relative z-1">
        
        <a className="navbar-brand fw-bold fs-3 text-dark m-0" href="#!">
          StepUp
        </a>

        <div className="d-flex align-items-center gap-3 order-lg-last">
          <button className="btn btn-link text-dark p-0 border-0" type="button">
            <i className="bi bi-search fs-5"></i>
          </button>
          <button className="btn btn-link text-dark p-0 border-0" type="button">
            <i className="bi bi-cart3 fs-5"></i>
          </button>

          <button
            className="navbar-toggler border-0 p-0 shadow-none ms-1 d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <i className="bi bi-list fs-2 text-dark"></i>
          </button>
        </div>

        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav gap-3 gap-lg-4 text-center my-3 my-lg-0">
            <li className="nav-item">
              <a className="nav-link active fw-bold text-dark" href="#!">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-secondary" href="#!">Shop</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-secondary" href="#!">Collection</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-secondary" href="#!">Customize</a>
            </li>
            <li className="nav-item">
              <Link to="/admin" className="btn btn-dark btn-sm">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;