import React, { useEffect, useState } from "react";
import PlanOptions from "../PlanOptions";
import "./style.css";

const PlanCard = ({ day, dayName }) => {
  let breakfast = <h1 className={"calendar-not"}>None</h1>;
  let lunch = <h1 className={"calendar-not"}>None</h1>;
  let dinner = <h1 className={"calendar-not"}>None</h1>;
  let dessert = <h1 className={"calendar-not"}>None</h1>;

  console.log(day, dayName)
  //========== Sorts the day's recipes and shows the pictures on the calendar ==============
  if (day.length) {
    day.forEach((recipe) => {
      if (recipe.plan_category === "Breakfast")
        breakfast = [(
          <a href={recipe.id}>
            <img className={"calendar-image"} src={recipe.image} />
          </a>
        ), recipe];
      else if (recipe.plan_category === "Lunch")
        lunch = [(
          <a href={recipe.id}>
            <img className={"calendar-image"} src={recipe.image} />
          </a>
        ), recipe];
      else if (recipe.plan_category === "Dinner")
        dinner = [(
          <a href={recipe.id}>
            <img className={"calendar-image"} src={recipe.image} />
          </a>
        ), recipe];
      else if (recipe.plan_category === "Dessert")
        dessert = [(
          <a href={recipe.id}>
            <img className={"calendar-image"} src={recipe.image} />
          </a>
        ), recipe];
    });
  }
  return (
    <div>
      <div>
        <h1 className={"calendar-name"}>{dayName}</h1>
        {/* Can add meal name and dayName for adding recipes */}
        <PlanOptions meal={breakfast} day={dayName} time={'Breakfast'} />
        <PlanOptions meal={lunch} day={dayName} time={'Lunch'} />
        <PlanOptions meal={dinner} day={dayName} time={'Dinner'} />
        <PlanOptions meal={dessert} day={dayName} time={'Dessert'} />
      </div>
    </div>
  );
};

export default PlanCard;
