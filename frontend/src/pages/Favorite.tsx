import React from "react";
import RecipeCategory from "../components/RecipeCategory";

function Favorite() {
  return (
    <>
      <section className="recommended-recipe-section">
        <RecipeCategory title="Your Favorites"></RecipeCategory>
      </section>
    </>
  );
}

export default Favorite;
