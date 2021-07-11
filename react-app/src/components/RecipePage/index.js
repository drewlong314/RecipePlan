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
  const recipe = recipes?.filter((recipe) => {
    return recipe?.id === Number(id);
  });
  if (recipe && !loaded) {
    setLoaded(true);
  }
  const allMeasurements = useSelector(
    (state) => state.measurementReducer.measurements
  );

  const allIngredients = useSelector(
    (state) => state.ingredientReducer.ingredients
  );

  let index = 1;

  if (loaded && allIngredients.length !== 0 && allMeasurements.length !== 0 && ingredients.length === 0 ) {
    const recipeCategories = recipe?.categories?.map((r) => {
      if (index === recipe[0].categories.length) return r.name;
      index++;
      return r.name + ", ";
    });

    console.log(allMeasurements);
    const ingredients = recipe[0].recipe_ingredients?.map((ingredient) => {
      const ingredientMeasurement = allMeasurements.filter((m) => {
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
  }, [loaded]);

  return (
    <>
      {recipe && ingredients &&(
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
            <div className={"recipe-page__numbers"}>
              <p className={"recipe-page__numbers__p"} key={"r4"}>
                {" "}
                Serves: {recipe[0].servings}
              </p>
              <p className={"recipe-page__numbers__p"} key={"r5"}>
                Total time: {recipe[0].time} min.
              </p>
            </div>
            <h2 className={"recipe-page__instructions__header"}>
              Instructions
            </h2>
            <ul className={"recipe-page__instructions"} key={"r6"}>
              {recipe[0].instructions.split(".").map((i) => {
                return i.length ? (
                  <li className={"recipe-page__instructions__li"}>{`${i}.`}</li>
                ) : null;
              })}
            </ul>
            {/* <p key={"r7"}>{recipeCategories}</p> */}
            <h2 className={"recipe-page__ingredients__header"}>Ingredients</h2>
            <div className={"recipe-page__ingredients__container"} key={"r8"}>
              {ingredients}
            </div>
            <div className={"recipe-page__buttons"}>
              <Link className={"recipe-page__edit"} key={"r9"} to={`/recipes/${recipe[0].id}/edit`}>
                Edit Recipe
              </Link>

              <button
                key={"r10"}
                onClick={() => dispatch(deleteRecipe(recipe?.id))}
              >
                Delete Recipe
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecipePage;
