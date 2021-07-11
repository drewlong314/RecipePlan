import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteRecipe } from "../../store/recipes";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentIngredient } from "../../store/ingredients";
import RecipeCard from "../RecipeCard";
import "./style.css";
import Navigation from "../Navigation";

const RecipeList = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipeReducer.recipes);
  const allMeasurements = useSelector(
    (state) => state.measurementReducer.measurements
  );
  const allIngredients = useSelector(
    (state) => state.ingredientReducer.ingredients
  );

  useEffect(() => {
    dispatch(setCurrentIngredient([]));
  }, []);

  return (
    <>
    <Navigation title={"Recipes"} other={"add"}/>
    <div className={"list-container"}>
      {/* <h1 className={"list-title"}>Recipe List</h1>
      <header className={"list-actions"}>
        <Link className={"list-actions__create"} to={`/recipes/create`}>
          ADD RECIPE
        </Link>
      </header> */}
      <div className={"list-cards"}>
        {allRecipes?.map((recipe) => {
          return <RecipeCard key={recipe.id} recipe={recipe}></RecipeCard>;
        })}
      </div>
    </div>
    </>
  );
};

export default RecipeList;
