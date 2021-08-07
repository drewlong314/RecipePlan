import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRecipe, editRecipe } from "../../store/recipes";
import { Link, useHistory } from "react-router-dom";
import "./style.css";

const MiniRecipeCard = ({ recipe, day, time }) => {
  const dispatch = useDispatch();
  const history = useHistory()

  const redirectOnClick = () => { // set the day and time of a project here
    console.log(recipe, day, time)
    dispatch(editRecipe(
        recipe.name,
        recipe.description,
        recipe.image,
        recipe.servings,
        recipe.time,
        recipe.instructions,
        recipe.user_id,
        recipe.id,
        recipe.categories,
        recipe.recipe_ingredients,
        day,
        time
        ))
  }

  return (
    <div onClick={redirectOnClick} className={"mini-recipe-card"}>
      <img key={"r3"} className={"mini-recipe-card__image"} src={recipe.image} />
      <h1 key={"r1"} className={"mini-recipe-card__name"}>
        {recipe.name}
      </h1>
    </div>
  );
};

export default MiniRecipeCard;
