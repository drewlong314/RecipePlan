import React, { useEffect, useState } from "react";
import PlanOptions from "../PlanOptions";
import "./style.css";

const PlanCard = ({ day, dayName }) => {
  let breakfast = <h1 className={"calendar-not"}>None</h1>;
  let lunch = <h1 className={"calendar-not"}>None</h1>;
  let dinner = <h1 className={"calendar-not"}>None</h1>;
  let dessert = <h1 className={"calendar-not"}>None</h1>;

  //========== Sorts the day's recipes and shows the pictures on the calendar ==============
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
        {/* Can add meal name and dayName for adding recipes */}
        <PlanOptions meal={breakfast} />
        <PlanOptions meal={lunch} />
        <PlanOptions meal={dinner} />
        <PlanOptions meal={dessert} />
      </div>
    </div>
  );
};

export default PlanCard;
