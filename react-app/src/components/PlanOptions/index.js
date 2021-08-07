import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editRecipe } from "../../store/recipes";
import CalendarModal from "../CalendarModal";

const PlanOptions = ({ meal, day, time }) => {
  const dispatch = useDispatch();
  const [options, setOptions] = useState(false);
  const ingredientList = [];

  const recipes = useSelector((state) => state.recipeReducer.recipes);

  useEffect(() => {
    setOptions(false)
  }, [recipes])

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
      recipe_id: meal[1].id,
    });
  };

  if (meal[1]) {
    let i = 0;
    meal[1].recipe_ingredients.map((ingredient) => {
      convertRecipe(
        ingredient.amount,
        ingredient.measurement_id,
        ingredient.ingredient_id,
        i
      );
      i++;
    });
  }

  const removeRecipe = () => {
    dispatch(
      editRecipe(
        meal[1].name,
        meal[1].description,
        meal[1].image,
        meal[1].servings,
        meal[1].time,
        meal[1].instructions,
        meal[1].user_id,
        meal[1].id,
        meal[1].categories,
        ingredientList,
        null,
        null
      )
    );
  }

  return (
    <div className={"calendar-box"}>
      {options && meal[1] && (
        <div className={"calendar-options"}>
          <button className={"calendar-options__x"} onClick={(e) => setOptions(false)}>X</button>
          <button className={"calendar-options__button"} onClick={removeRecipe}>Remove recipe</button>
        </div>
      )}
      {options && !meal[1] && (
        <div className={"calendar-options"}>
          <button className={"calendar-options__x"} onClick={(e) => setOptions(false)}>X</button>
          <CalendarModal day={day} time={time}/>
        </div>
      )}
      {!options && (
        <div className={'calendar-options'}>
          <button
            className={"calendar-options__dots"}
            onClick={(e) => setOptions(true)}
          >
            ...
          </button>
        </div>
      )}
      {meal[0]}
    </div>
  );
};

export default PlanOptions;
