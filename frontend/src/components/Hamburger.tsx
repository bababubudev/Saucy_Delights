import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "../styles/navbar.scss"

function Hamburger() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="hamburger-menu">
      <button onClick={() => setIsOpen(!isOpen)}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      {isOpen && (
        <ul className="hamburger-menu-list">
          <li>
            <Link to="/login" className="login-button">Login</Link>
          </li>
          <li>
            <Link to="/register" className="register-button">Register</Link>
          </li>
          <li>
            <Link to="/favorite">Favorite Recipes</Link>
          </li>
          <input type="search" placeholder="Search for a recipe..." />
        </ul>
      )}
    </div>
  );
}

export default Hamburger;
