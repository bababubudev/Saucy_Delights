import React from "react";
import "../styles/recipedetails.scss";
import { Link } from "react-router-dom";
import "../styles/global.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faShare } from "@fortawesome/free-solid-svg-icons";

function RecipeDetails() {
  return (
    <>
      <Link to="/" className="button back-button">
        Back
      </Link>
      <main>
        <h1>Pro Cabonara</h1>
        <header>
          <div className="rating-preview-wrapper">
            <div className="stars">
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </div>
            <p className="rating">4.9</p>
            <span style={{ marginLeft: "0.5rem" }}>(</span>
            <p className="number-of-rating">3408</p>
            <span>)</span>
            <p className="review-count">
              333 <span>reviews</span>
            </p>
          </div>
        </header>
        <button className="button favorite-button">Favorite</button>
        <button className="button share-button">
          <FontAwesomeIcon icon={faShare} />
        </button>
      </main>
      <section className="img-ingredients">
        <img
          src="https://www.simplyrecipes.com/thmb/dxh2mg_24ZGjRIX21j_qfHrj0xk=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Spaghetti-Carbonara-LEAD-7-82d6bacf7f3848a4943b14712ab205ff.jpg"
          alt="image of a spaghetti"
        />
        <ul className="ingredients">
          <h2>Ingredients</h2>
          <li>1 pound spaghetti</li>
          <li>4 slices bacon</li>
          <li>1/2 cup finely chopped onion</li>
          <li>2 cloves garlic, minced</li>
          <li>1/2 cup dry white wine</li>
          <li>1/4 cup heavy cream</li>
          <li>1/4 cup grated Parmesan cheese, plus more for serving</li>
          <li>1/4 teaspoon freshly ground black pepper</li>
          <li>1/4 teaspoon salt</li>
        </ul>
      </section>
  
      <section className="steps">
        <h2>Steps</h2>
        <ol>
          <li>
            Bring a large pot of salted water to a boil. Cook pasta in boiling
            water, stirring occasionally until cooked through but firm to the
            bite, about 12 minutes. Drain.
          </li>
          <li>
            Meanwhile, cook bacon in a large, deep skillet over medium-high heat
            until evenly brown. Drain, crumble, and set aside.
          </li>
          <li>
            Cook and stir onion in the hot bacon drippings until softened and
            translucent, about 5 minutes. Stir in garlic; cook until fragrant,
            about 30 seconds.
          </li>
          <li>
            Pour white wine into the skillet. Bring to a simmer and cook until
            reduced by half, about 2 minutes. Stir in cream, Parmesan cheese,
            black pepper, and salt. Cook until cheese is melted and sauce has
            thickened, about 2 minutes. Remove from heat.
          </li>
          <li>
            Toss pasta with bacon and sauce in the skillet until coated. Divide
            pasta among serving dishes and sprinkle with additional Parmesan
            cheese to serve.
          </li>
        </ol>
      </section>
     
      <section className="reviews">
        <h2>Reviews</h2>
      </section>
    </>
  );
}

export default RecipeDetails;
