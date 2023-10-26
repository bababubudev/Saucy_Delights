import React from "react";
import RecipeCategory from "../components/RecipeCategory";
import { Link } from "react-router-dom";
import "../styles/global.scss";

function Favorite() {
  return (
    <>
      <Link to="/" className="button" style={{marginLeft:"2rem"}} >
        Home
      </Link>
      <section className="recommended-recipe-section" >
        <RecipeCategory title="Your Favorites"></RecipeCategory>
      </section>
    </>
  );
}

export default Favorite;
