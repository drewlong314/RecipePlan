import React from "react";
import { useSelector } from "react-redux";

const IngredientCard = ({ quantity, measurement, ingredient }) => {
  const allIngredients = useSelector((state) => state.ingredientReducer.current)
  console.log(quantity, measurement, ingredient);
  console.log(allIngredients[0])
  return (
    <div>
      <li>
        {`${quantity} ${measurement} ${ingredient}`}
        <span>
          <button type="button">Remove Ingredient</button>
        </span>
      </li>
    </div>
  );
};

export default IngredientCard;
