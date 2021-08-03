import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./style.css";

const PlanCard = ({ day, dayName }) => {
  const recipes = useSelector((state) => state.recipeReducer.recipes);
  let breakfast = <h1 className={"calendar-not"}>None</h1>;
  let lunch = <h1 className={"calendar-not"}>None</h1>;
  let dinner = <h1 className={"calendar-not"}>None</h1>;
  let dessert = <h1 className={"calendar-not"}>None</h1>;
  if (day.length) {
    day.forEach((recipe) => {
      if (recipe.plan_category === "Breakfast")
        breakfast = (
          <a href={recipe.id}>
            <img className={"calendar-image"} src={recipe.image} />
          </a>
        );
      else if (recipe.plan_category === "Lunch")
        lunch = (
          <a href={recipe.id}>
            <img className={"calendar-image"} src={recipe.image} />
          </a>
        );
      else if (recipe.plan_category === "Dinner")
        dinner = (
          <a href={recipe.id}>
            <img className={"calendar-image"} src={recipe.image} />
          </a>
        );
      else if (recipe.dessert === "Dessert")
        dessert = (
          <a href={recipe.id}>
            <img className={"calendar-image"} src={recipe.image} />
          </a>
        );
    });
  }
  return (
    <div>
      <div>
        <h1 className={"calendar-name"}>{dayName}</h1>
        <div className={"calendar-box"}>{breakfast}</div>
        <div className={"calendar-box"}>{lunch}</div>
        <div className={"calendar-box"}>{dinner}</div>
        <div className={"calendar-box"}>{dessert}</div>
      </div>
    </div>
  );
};

export default PlanCard;
