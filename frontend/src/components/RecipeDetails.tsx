import React from "react";
import "../styles/recipedetails.scss";

function RecipeDetails() {
  return (
    <>
      <main>
        <h1>Pro Cabonara</h1>
        <header>
          <div className="rating-preview-wrapper">
            <div className="stars">*****</div>
            <p className="rating">4.9</p>
            <p className="number-of-rating">3408</p>
          </div>
          <div className="review-preview-wrapper">
            <p className="review-count">333 <span>reviews</span></p>
          </div>
        </header>
        <button className="favorite-button">Favorite</button>
        <button className="share-button">Sharebutton</button>
      </main>
      <section className="img-wrapper">
        <img
          src="https://www.simplyrecipes.com/thmb/dxh2mg_24ZGjRIX21j_qfHrj0xk=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Spaghetti-Carbonara-LEAD-7-82d6bacf7f3848a4943b14712ab205ff.jpg"
          alt=""
        />
      </section>
      <section className="ingredients">
        <h2>Ingredients</h2>
        <ul>
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
      <section className="star-rating">
        <div className="stars">*****</div>
        <p className="rating">4.9</p>
        <p className="number-of-rating">3408</p>
      </section>
      <section className="reviews">
        <h2>Reviews</h2>
      </section>
    </>
  );
}

export default RecipeDetails;
