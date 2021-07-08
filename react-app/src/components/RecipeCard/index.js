import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRecipe } from "../../store/recipes";
import { Link, useHistory } from "react-router-dom";
import "./style.css";

const RecipeCard = ({ recipe }) => {
  const dispatch = useDispatch();
  const history = useHistory()

  const allMeasurements = useSelector(
    (state) => state.measurementReducer.measurements
  );

  const allIngredients = useSelector(
    (state) => state.ingredientReducer.ingredients
  );

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
      <p
        key={`${ingredient.id}${ingredient.amount}${index}`}
      >{`${ingredient.amount} ${ingredientMeasurement[0]?.name} ${ingredientIngredient[0]?.name}`}</p>
    );
  });

  const redirectOnClick = () => {
    console.log(recipe.id)
    history.push(`/recipes/${recipe.id}`)
  }

  return (
    <div onClick={redirectOnClick} className={"recipe-card"}>
      <img key={"r3"} className={"recipe-image"} src={recipe.image} />
      <h1 key={"r1"} className={"recipe-name"}>
        {recipe.name}
      </h1>
      <p key={"r2"} className={"recipe-description"}>
        {recipe.description}
      </p>
      {/* <p key={"r4"}>{recipe.servings}</p>
      <p key={"r5"}>{recipe.time}</p>
      <p key={"r6"}>{recipe.instructions}</p>
      <p key={"r7"}>{recipeCategories}</p>
      <div key={"r8"}>{ingredients}</div>
      <Link key={"r9"} to={`/recipes/${recipe.id}/edit`}>
        Edit
      </Link>

      <button key={"r10"} onClick={() => dispatch(deleteRecipe(recipe.id))}>
        Delete Recipe
      </button> */}
    </div>
  );
};

export default RecipeCard;
