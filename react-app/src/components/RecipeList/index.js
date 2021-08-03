import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteRecipe } from "../../store/recipes";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentIngredient } from "../../store/ingredients";
import RecipeCard from "../RecipeCard";
import Navigation from "../Navigation";
import "./style.css";

const RecipeList = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipeReducer.recipes);

  useEffect(() => {
    dispatch(setCurrentIngredient([]));
  }, []);

  return (
    <>
    <Navigation title={"Recipes"} other={"add"}/>
    <div className={"list-container"}>
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
