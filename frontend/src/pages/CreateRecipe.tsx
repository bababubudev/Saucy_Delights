import React, { useState } from "react";
import Input from "../components/Input";
import "../styles/createrecipe.scss";
import { Link } from "react-router-dom";
import "../styles/global.scss";

function CreateRecipe() {
  const [formData, setFormData] = useState({
    recipeTitle: "",
    recipeIngredients: "",
    recipeTime: "",
  });

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.name)
    console.log(event.target.value)
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }
  return (
    <>
      <Link to="/" className="button" style={{ marginLeft: "2rem" }}>
        Home
      </Link>
      <div className="create-recipe">
        <h1>Create Recipe</h1>
        <Input
          inputTitle="Recipe Title"
          inputType="text"
          inputId="recipe-title"
          inputValue={formData.recipeTitle}
          inputPlaceHolder="Set a name for your recipe"
          inputName="recipeTitle"
          inputOnChange={onChangeHandler}
        ></Input>
        <Input
          inputTitle="Recipe Image (JPG or PNG)"
          inputType="file"
          inputId="recipe-image"
          accept="image/png, image/jpg"
          inputPlaceHolder=""
        ></Input>
        <Input
          inputTitle="Ingredients"
          inputType="text"
          inputId="recipe-ingredients"
          inputValue={formData.recipeIngredients}
          inputPlaceHolder="Put the ingredients for your recipe (Freely type)"
          inputOnChange={onChangeHandler}
          inputName="recipeIngredients"
        ></Input>
        <div className="recipe-cuisine-wrapper">
          <label htmlFor="recipe-cuisine">Cuisine</label>
          <select id="recipe-cuisine">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
        <div className="recipe-difficulty-wrapper">
          <label htmlFor="recipe-difficulty">Difficulty (Your Opinion)</label>
          <select id="recipe-difficulty">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>

        <Input
          inputTitle="Total Time (Minutes)"
          inputType="number"
          inputId="recipeTime"
          inputValue={formData.recipeTime}
          inputPlaceHolder="How long this recipe takes"
          inputOnChange={onChangeHandler}
          inputName="recipeTime"
        ></Input>

        <div className="recipe-steps-wrapper">
          <label htmlFor="recipe-steps">Steps</label>
          <textarea
            name="recipe-steps"
            cols="30"
            rows="5"
            className="recipe-steps"
            id="recipe-steps"
          ></textarea>
        </div>
      </div>
    </>
  );
}

export default CreateRecipe;
