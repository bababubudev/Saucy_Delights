import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import RecipeCategory from "../components/RecipeCategory";

import data from "../app/data/data.json";
interface Recipe {
  id: number;
  title: string;
  difficulty: string;
  image: string;
  starRating: number;
  ratingNumber: number;
}
function Home() {
  return (
    <>
      <section className="create-recipe-button">
        <button>
          Create Recipe <FontAwesomeIcon icon={faPlus} />
        </button>
      </section>
      <section className="top-recipe-section">
        <RecipeCategory title="Test" ></RecipeCategory>
      </section>
    </>
  );
}

export default Home;
