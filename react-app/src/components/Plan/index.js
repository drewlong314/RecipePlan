import React from "react";
import { useSelector } from "react-redux";
import PlanCard from "../PlanCard";

const Plan = () => {
  const recipes = useSelector((state) => state.recipeReducer.recipes);
  console.log(recipes);
  let monday = [];
  const daySorter = recipes?.forEach((recipe) => {
    if (recipe.day === "Monday") monday.push(recipe);
  });
  return (
    <div>
        <PlanCard day={monday}/>
    </div>
  );
};

export default Plan;
