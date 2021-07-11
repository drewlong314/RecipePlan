import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRecipe } from "../../store/recipes";
import { Link, useHistory, useParams } from "react-router-dom";
import "./style.css";

const RecipePage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const [loaded, setLoaded] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const recipes = useSelector((state) => state.recipeReducer.recipes);
  console.log(recipes);
  const recipe = recipes?.filter((recipe) => {
    console.log(recipe.id, id);
    return recipe?.id === Number(id);
  });
  if (recipe && !loaded) {
    console.log(recipe);
    setLoaded(true);
  }
  const allMeasurements = useSelector(
    (state) => state.measurementReducer.measurements
  );

  const allIngredients = useSelector(
    (state) => state.ingredientReducer.ingredients
  );

  let index = 1;

  if (loaded && ingredients.length === 0) {
    console.log("this is loaded", recipe);
    const recipeCategories = recipe?.categories?.map((r) => {
      if (index === recipe[0].categories.length) return r.name;
      index++;
      return r.name + ", ";
    });

    const ingredients = recipe[0].recipe_ingredients?.map((ingredient) => {
      console.log(ingredient);
      const ingredientMeasurement = allMeasurements.filter((m) => {
        console.log(allMeasurements);
        return m.id === ingredient.measurement_id;
      });
      const ingredientIngredient = allIngredients.filter((i) => {
        return i.id === ingredient.ingredient_id;
      });
      return (
        <p
          className={"recipe-page__ingredients"}
          key={`${ingredient.id}${ingredient.amount}${index}`}
        >{`${ingredient.amount} ${ingredientMeasurement[0]?.name} ${ingredientIngredient[0]?.name}`}</p>
      );
    });
    setIngredients(ingredients);
  }

  const redirectOnClick = () => {
    history.push(`/recipes/${recipe[0].id}`);
  };

  useEffect(() => {
    console.log(recipe);
  }, [loaded]);

  return (
    <>
      {recipe && (
        <div className={"recipe-page"}>
          <div className={"recipe-page__container"}>
            <h1 className={"recipe-page__name"} key={"r1"}>
              {recipe[0].name}
            </h1>
            <img
              className={"recipe-page__image"}
              key={"r3"}
              src={recipe[0].image}
            />
            <p className={"recipe-page__description"} key={"r2"}>
              {recipe[0].description}
            </p>
            <p key={"r4"}> Serves: {recipe[0].servings}</p>
            <p key={"r5"}>Total time: {recipe[0].time} min.</p>
            <p key={"r6"}>{recipe[0].instructions}</p>
            {/* <p key={"r7"}>{recipeCategories}</p> */}
            <h2 className={"recipe-page__ingredients__header"}>Ingredients</h2>
            <div className={"recipe-page__ingredients__container"} key={"r8"}>
              {ingredients}
            </div>
            <Link key={"r9"} to={`/recipes/${recipe[0].id}/edit`}>
              Edit
            </Link>

            <button
              key={"r10"}
              onClick={() => dispatch(deleteRecipe(recipe?.id))}
            >
              Delete Recipe
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default RecipePage;
