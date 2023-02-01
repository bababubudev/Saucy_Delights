import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import RecipeCategory from "../components/RecipeCategory";
import "../styles/home.scss"

import data from "../app/data/data.json";
// interface Recipe {
//   id: number;
//   title: string;
//   difficulty: string;
//   image: string;
//   starRating: number;
//   tota: number;
// }
function Home() {
  return (
    <>
      <Link to="create-recipe" className="create-recipe-button">
        <button>
          Create Recipe <FontAwesomeIcon icon={faPlus} className="plus-icon" />
        </button>
      </Link>
      <section className="top-recipe-section">
        <RecipeCategory title="Popular Category" ></RecipeCategory>
      </section>
      <section className="recommended-recipe-section">
        <RecipeCategory title="Recommended Category" ></RecipeCategory>
      </section>
    </>
  );
}

export default Home;
