import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const PlanCard = ({day}) => {
  const recipes = useSelector((state) => state.recipeReducer.recipes);
  let breakfast = ''
  let lunch = ''
  let dinner = ''
  let dessert = ''
  if (day.length) {
    day.forEach(recipe => {
        console.log(recipe.plan_category)
        if (recipe.plan_category === 'Breakfast') breakfast = recipe.name
        else if (recipe.plan_category === 'Lunch') lunch = recipe.name
        else if (recipe.plan_category === 'Dinner') dinner = recipe.name
        else if (recipe.dessert === 'Dessert') dessert = recipe.name
    });
  }
  return (
    <div>
      <div>
        <div>
          <h1>Monday</h1>
          <div>
            <h1>Breakfast</h1>
            <h2>{breakfast}</h2>
          </div>
          <div>
            <h1>Lunch</h1>
            <h2>{lunch}</h2>
          </div>
          <div>
            <h1>Dinner</h1>
            <h2>{dinner}</h2>
          </div>
          <div>
            <h1>Dessert</h1>
            <h2>{dessert}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
