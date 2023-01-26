import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.scss";
import Hamburger from "./Hamburger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

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
            <Link to="/favorite" className="favorite-recipe-desktop">
              Favorite{" "}
              <span>
                <FontAwesomeIcon icon={faHeart} />
              </span>
            </Link>
          </li>
          <li>
            <Link to="/login" className="login-button-desktop">
              Login{" "}
              <span>
                <FontAwesomeIcon icon={faRightToBracket} />
              </span>
            </Link>
          </li>
          <li>
            <Link to="/register" className="register-button-desktop">
              Register{" "}
              <span>
                <FontAwesomeIcon icon={faUserPlus} />
              </span>
            </Link>
          </li>
          <input type="search" />
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
