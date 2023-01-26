import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import "../styles/navbar.scss";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function Hamburger() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <div className="hamburger-menu">
      <button onClick={() => setIsOpen(!isOpen)}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      {isOpen && (
        <ul className="hamburger-menu-list">
          <li>
            <Link to="/login" className="login-button">
              Login{" "}
              <span>
                <FontAwesomeIcon icon={faRightToBracket} />
              </span>
            </Link>
          </li>
          <li>
            <Link to="/register" className="register-button">
              Register{" "}
              <span>
                <FontAwesomeIcon icon={faUserPlus} />
              </span>
            </Link>
          </li>
          <li>
            <Link to="/favorite" className="favorite-recipe">
              Favorite Recipes{" "}
              <span>
                <FontAwesomeIcon icon={faHeart} />
              </span>
            </Link>
          </li>
          <input type="search" placeholder="Search for a recipe..." />
        </ul>
      )}
    </div>
  );
}

export default Hamburger;
