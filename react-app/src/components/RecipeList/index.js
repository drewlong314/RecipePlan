import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteRecipe} from "../../store/recipes";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentIngredient } from "../../store/ingredients";
import RecipeCard from "../RecipeCard"

const RecipeList = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipeReducer.recipes);
  const allMeasurements = useSelector(
    (state) => state.measurementReducer.measurements
  );
  const allIngredients = useSelector((state) => state.ingredientReducer.ingredients)

  useEffect(() => {
    dispatch(setCurrentIngredient([]))
  }, [])

  return (
    <div>
      <Link to={`/recipes/create`}>Create A New Recipe</Link>
      <h1>Recipe List</h1>
      {allRecipes?.map((recipe) => {
        return <RecipeCard key={recipe.id} recipe={recipe}></RecipeCard>
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
            <p key={`${ingredient.id}${ingredient.amount}${index}`}>{`${ingredient.amount} ${ingredientMeasurement[0]?.name} ${ingredientIngredient[0]?.name}`}</p>
          );
        });
        return [
          <h1 key={'r1'}>{recipe.name}</h1>,
          <p key={'r2'}>{recipe.description}</p>,
          <img key={'r3'} src={recipe.image} />,
          <p key={'r4'}>{recipe.servings}</p>,
          <p key={'r5'}>{recipe.time}</p>,
          <p key={'r6'}>{recipe.instructions}</p>,
          <p key={'r7'}>{recipeCategories}</p>,
          <div key={'r8'}>{ingredients}</div>,
          <Link key={'r9'} to={`/recipes/${recipe.id}/edit`}>Edit</Link>,
          <button key={'r10'} onClick={() => dispatch(deleteRecipe(recipe.id))}>
            Delete Recipe
          </button>,
        ];
      })}
    </div>
  );
};

export default RecipeList;
