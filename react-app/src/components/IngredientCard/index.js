import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCurrentIngredient } from "../../store/ingredients";

const IngredientCard = ({ quantity, measurement, ingredient, identifier }) => {
  const dispatch = useDispatch();
  const currentIngredients = useSelector(
    (state) => state.ingredientReducer.current
  );
  const removeIngredient = () => {
    const ingredientToRemove = currentIngredients.filter((ingredient) => {
      return ingredient.props.identifier === identifier;
    });
    dispatch(removeCurrentIngredient(ingredientToRemove[0]));
  };
  return (
    <div>
      <li>
        {`${quantity} ${measurement} ${ingredient}`}
        <span>
          <button onClick={removeIngredient} type="button">
            Remove Ingredient
          </button>
        </span>
      </li>
    </div>
  );
};

export default IngredientCard;
