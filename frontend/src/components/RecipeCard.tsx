import React from 'react'

interface RecipeCardProps {
  title: string;
  image: string;
}

function RecipeCard(props:RecipeCardProps) {
  return (
    <div className="recipe-card">
      <div className="img-wrapper">
        <img src={props.image} alt="123" />
      </div>
      <h4>{props.title}</h4>
    </div>
  )
}

export default RecipeCard