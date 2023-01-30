import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "../styles/recipecard.scss";

interface RecipeCardProps {
  title: string;
  image: string;
  totalRating: number;
  starRating: number;
}

function RecipeCard(props: RecipeCardProps) {
  return (
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
  );
}

export default RecipeCard;
