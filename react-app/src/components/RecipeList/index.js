import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteRecipe, getAllRecipes } from "../../store/recipes";
import { useDispatch, useSelector } from "react-redux";

const RecipeList = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipeReducer.recipes);
  const allMeasurements = useSelector(
    (state) => state.measurementReducer.measurements
  );
  const allIngredients = useSelector((state) => state.ingredientReducer.ingredients)

  return (
    <div>
      <Link to={`/recipes/create`}>Create A New Recipe</Link>
      <h1>Recipe List</h1>
      {allRecipes?.map((recipe) => {
        let index = 1;
        const recipeCategories = recipe.categories.map((r) => {
          if (index === recipe.categories.length) return r.name;
          index++;
          return r.name + ", ";
        });
        const ingredients = recipe.recipe_ingredients.map((ingredient) => {
          const ingredientMeasurement = allMeasurements.filter((m) => {
            return m.id === ingredient.measurement_id;
          });
          const ingredientIngredient = allIngredients.filter((i) => {
            return i.id === ingredient.ingredient_id;
          });
          return (
            <p>{`${ingredient.amount} ${ingredientMeasurement[0]?.name} ${ingredientIngredient[0]?.name}`}</p>
          );
        });
        return [
          <h1>{recipe.name}</h1>,
          <p>{recipe.description}</p>,
          <img src={recipe.image} />,
          <p>{recipe.servings}</p>,
          <p>{recipe.time}</p>,
          <p>{recipe.instructions}</p>,
          <p>{recipeCategories}</p>,
          <div>{ingredients}</div>,
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
