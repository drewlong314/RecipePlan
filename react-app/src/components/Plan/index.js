import React from "react";
import { useSelector } from "react-redux";
import PlanCard from "../PlanCard";
import "./style.css";

const Plan = () => {
  const recipes = useSelector((state) => state.recipeReducer.recipes);
  console.log(recipes);
  let monday = [];
  let tuesday = [];
  let wednesday = [];
  let thursday = [];
  let friday = [];
  let saturday = [];
  let sunday = [];
  const daySorter = recipes?.forEach((recipe) => {
    if (recipe.day === "Monday") monday.push(recipe);
  });
  return (
    <div className={"calendar"}>
      <PlanCard day={monday} dayName={'Monday'} />
      <PlanCard day={tuesday} dayName={'Tuesday'}/>
      <PlanCard day={wednesday} dayName={'Wednesday'}/>
      <PlanCard day={thursday} dayName={'Thursday'}/>
      <PlanCard day={friday} dayName={'Friday'}/>
      <PlanCard day={saturday} dayName={'Saturday'}/>
      <PlanCard day={sunday} dayName={'Sunday'}/>
    </div>
  );
};

export default Plan;
