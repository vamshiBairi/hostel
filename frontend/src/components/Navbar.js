import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand ms-4" href="/">Navbar</a> {/* Navbar Brand */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span> 
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0"> 
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link> 
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/notifications">Notifications</Link> 
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle me-4"
                href="/"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Login
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/admin">Admin</Link></li> 
                <li><Link className="dropdown-item" to="/student">Student</Link></li> 
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/logout">LogOut</Link></li> 
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
