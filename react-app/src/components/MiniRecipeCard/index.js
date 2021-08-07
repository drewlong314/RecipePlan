import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRecipe, editRecipe } from "../../store/recipes";
import { Link, useHistory } from "react-router-dom";
import "./style.css";

const MiniRecipeCard = ({ recipe, day, time }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const ingredientList = [];

  const convertRecipe = async (amount, measurement, ingredient, i) => {
    const res = await fetch("/api/recipes/convert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        measurement,
        ingredient,
      }),
    });
    const data = await res.json();

    ingredientList.push({
      key: i,
      quantity: amount,
      measurement: data.info[0],
      ingredient: data.info[1],
      ingredient_id: ingredient,
      recipe_id: recipe.id,
    });
  };

  let i = 0;
  recipe.recipe_ingredients.map((ingredient) => {
    convertRecipe(
      ingredient.amount,
      ingredient.measurement_id,
      ingredient.ingredient_id,
      i
    );
    i++;
  });

  const redirectOnClick = () => {
    // set the day and time of a project here
    console.log(recipe, day, time);
    dispatch(
      editRecipe(
        recipe.name,
        recipe.description,
        recipe.image,
        recipe.servings,
        recipe.time,
        recipe.instructions,
        recipe.user_id,
        recipe.id,
        recipe.categories,
        ingredientList,
        day,
        time
      )
    );
  };

  return (
    <div onClick={redirectOnClick} className={"mini-recipe-card"}>
      <img
        key={"r3"}
        className={"mini-recipe-card__image"}
        src={recipe.image}
      />
      <h1 key={"r1"} className={"mini-recipe-card__name"}>
        {recipe.name}
      </h1>
    </div>
  );
};

export default MiniRecipeCard;
