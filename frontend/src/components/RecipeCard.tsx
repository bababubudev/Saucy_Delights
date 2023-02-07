import React from "react";
import { Route, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "../styles/recipecard.scss";
import Recipe from "../pages/Recipe";

interface RecipeCardProps {
  title: string;
  image: string;
  totalRating: number;
  starRating: number;
  id: number;
}

function RecipeCard(props: RecipeCardProps) {
  return (
    <>
      <Link to={`/recipe/${props.id}/${props.title.replace(/\s+/g, "-")}`}>
        <div className="recipe-card">
          <div className="img-wrapper">
            <img src={props.image} alt="123" />
          </div>
          <h4 className="card-title">{props.title}</h4>
          <div className="rating-wrapper">
            <p>{props.totalRating}</p>
            <p>
              <FontAwesomeIcon icon={faStar} />
              {props.starRating}
            </p>
          </div>
        </div>
      </Link>
      {/* <Route
        path={`/recipe/${props.id}/${props.title.replace(/\s+/g, "-")}`}
        render={(props: any) => {
          <Recipe {...props}></Recipe>
        }}
      ></Route> */}
    </>
  );
}

export default RecipeCard;
