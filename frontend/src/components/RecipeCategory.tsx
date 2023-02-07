import React from "react";
import data from "../app/data/data.json";
import RecipeCard from "./RecipeCard";
import "../styles/recipecategory.scss"

interface RecipeCategoryProps {
  title: string;
}
function RecipeCategory(props: RecipeCategoryProps) {
  return (
    <div className="recipe-category">
      <h2 className="category-title">{props.title}</h2>
      <div className="recipe-card-list">
        {data.recipes.map((recipe) => (
          <RecipeCard
            title={recipe.title}
            image={recipe.image}
            totalRating={recipe.totalRating}
            starRating={recipe.starRating}
            id={recipe.id}
          />
        ))}
      </div>
    </div>
  );
}
export default RecipeCategory;
