import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteRecipe, getAllRecipes } from "../../store/recipes";
import { useDispatch, useSelector } from "react-redux";

const RecipeList = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipeReducer.recipes);

  return (
    <div>
      <Link to={`/recipes/create`}>Create A New Recipe</Link>
      <h1>Recipe List</h1>
      {allRecipes?.map((recipe) => {
        return [
          <h1>{recipe.name}</h1>,
          <p>{recipe.description}</p>,
          <img src={recipe.image} />,
          <p>{recipe.servings}</p>,
          <p>{recipe.time}</p>,
          <p>{recipe.instructions}</p>,
          <p>{recipe.categories[0].name}</p>,
          <Link to={`/recipes/${recipe.id}/edit`}>Edit</Link>,
          <button onClick={() => dispatch(deleteRecipe(recipe.id))}>
            Delete Recipe
          </button>,
        ];
      })}
    </div>
  );
};

export default RecipeList;
