import React, { useEffect } from "react";
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
  const [fontSize, setFontSize] = React.useState("1rem");

  useEffect(() => {
    if (props.title.length > 20) {
      setFontSize("0.75rem");
    }
  }, [props.title]);

  return (
    <>
      <Link to={`/recipe/${props.id}/${props.title.replace(/\s+/g, "-")}`}>
        <div className="recipe-card">
          <div className="img-wrapper">
            <img src={props.image} alt="123" />
          </div>
          <h4 className="card-title" style={{ fontSize: `${fontSize}` }}>
            {props.title}
          </h4>
          <div className="rating-wrapper">
            <p>{props.totalRating}</p>
            <p>
              <FontAwesomeIcon icon={faStar} />
              {props.starRating}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}

export default RecipeCard;
