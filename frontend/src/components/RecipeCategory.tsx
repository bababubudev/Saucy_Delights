import React from "react";
import data from "../app/data/data.json";
import RecipeCard from "./RecipeCard";

interface RecipeCategoryProps {
  title: string;
}
function RecipeCategory(props: RecipeCategoryProps) {
  return (
    <>
      <h2>{props.title}</h2>
      <div className="recipe-card-list">
        {data.recipes.map((recipe) => (
          <RecipeCard title={recipe.title} image={recipe.image} />
        ))}
      </div>
    </>
  );
}
export default RecipeCategory;
