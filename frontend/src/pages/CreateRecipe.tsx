import React from "react";
import Input from "../components/Input";
import "../styles/createrecipe.scss"

function CreateRecipe() {
  return (
    <div className="create-recipe">
      <h1>Create Recipe</h1>
      <Input
        inputTitle="Recipe Title"
        inputType="text"
        inputId="recipe-title"
        inputValue=""
        inputPlaceHolder="Set a name for your recipe"
      ></Input>
      <Input
        inputTitle="Ingredients"
        inputType="text"
        inputId="recipe-ingredients"
        inputValue=""
        inputPlaceHolder="Put the ingredients for your recipe"
      ></Input>
    </div>
  );
}

export default CreateRecipe;
