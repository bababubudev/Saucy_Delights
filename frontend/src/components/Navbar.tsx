import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.scss";
import Hamburger from "./Hamburger";

function Navbar() {
  return (
    <>
      <nav>
        <li>
          <Link to="/" className="logo">
            Saucy Delights
          </Link>
        </li>
        <Hamburger></Hamburger>
        <ul className="nav-menu">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/favorite">Favorite Recipes</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
