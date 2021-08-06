import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import PlanCard from "../PlanCard";
import "./style.css";

const Plan = () => {
  const recipes = useSelector((state) => state.recipeReducer.recipes);

  useEffect(() => {

  }, [recipes])

  let monday = [];
  let tuesday = [];
  let wednesday = [];
  let thursday = [];
  let friday = [];
  let saturday = [];
  let sunday = [];

  //========== Sorts all the recipes for a user into days ==============
  const daySorter = recipes?.forEach((recipe) => {
    if (recipe.day === "Monday") monday.push(recipe);
    else if (recipe.day === "Tuesday") tuesday.push(recipe);
    else if (recipe.day === "Wednesday") wednesday.push(recipe);
    else if (recipe.day === "Thursday") thursday.push(recipe);
    else if (recipe.day === "Friday") friday.push(recipe);
    else if (recipe.day === "Saturday") saturday.push(recipe);
    else if (recipe.day === "Sunday") sunday.push(recipe);
  });

  return (
    <div className={"calendar"}>
      <PlanCard day={sunday} dayName={'Sunday'}/>
      <PlanCard day={monday} dayName={'Monday'} />
      <PlanCard day={tuesday} dayName={'Tuesday'}/>
      <PlanCard day={wednesday} dayName={'Wednesday'}/>
      <PlanCard day={thursday} dayName={'Thursday'}/>
      <PlanCard day={friday} dayName={'Friday'}/>
      <PlanCard day={saturday} dayName={'Saturday'}/>
    </div>
  );
};

export default Plan;
