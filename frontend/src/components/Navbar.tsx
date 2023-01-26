import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Logo</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/favorite">Favorite</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
