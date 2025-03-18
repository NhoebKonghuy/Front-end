import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineAccountCircle } from "react-icons/md";
import logo from "../images/logo.png";

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/profile";
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{ marginLeft: "20px" }}>
          <img src={logo} alt="logo" width="75" height="50" />
        </Link>

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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item" style={{ marginLeft: "40px" }}>
              <Link
                className="nav-link active"
                aria-current="page"
                to="/dashboard"
                style={{ transition: "color 0.3s ease" }}
              >
                Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/booking"
                style={{ transition: "color 0.3s ease" }}
              >
                Booking
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/pitch"
                style={{ transition: "color 0.3s ease" }}
              >
                Pitch
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/admin"
                style={{ transition: "color 0.3s ease" }}
              >
                Admin
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/report"
                style={{ transition: "color 0.3s ease" }}
              >
                Report
              </Link>
            </li>
          </ul>

          <div className="dropdown">
            <div
              className="d-flex align-items-center dropdown-toggle"
              id="accountDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ cursor: "pointer" }}
            >
              <MdOutlineAccountCircle
                size={30}
                style={{
                  marginRight: "20px",
                  transition: "transform 0.3s ease",
                }}
                className="navbar-icon"
              />
            </div>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="accountDropdown"
            >
              <li>
                <Link className="dropdown-item" to="/profile">
                  Profile
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/settings">
                  Settings
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link
                  className="dropdown-item"
                  to="/logout"
                  onClick={handleLogout}
                >
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
