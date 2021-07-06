import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCurrentIngredient, removeIngredient } from "../../store/ingredients";

const IngredientCard = ({ quantity, measurement, ingredient, identifier, ingredient_id, recipe_id }) => {
  console.log(identifier)
  const dispatch = useDispatch();
  const currentIngredients = useSelector(
    (state) => state.ingredientReducer.current
  );
  const removeAnIngredient = () => {
    const ingredientToRemove = currentIngredients.filter((ingredient) => {
      console.log(ingredient)
      return ingredient.props.identifier === identifier;
    });
    if (recipe_id) dispatch(removeIngredient(ingredientToRemove[0]));
    else dispatch(removeCurrentIngredient(ingredientToRemove[0]))
  };
  return (
    <div>
      <li>
        {`${quantity} ${measurement} ${ingredient}`}
        <span>
          <button onClick={removeAnIngredient} type="button">
            Remove Ingredient
          </button>
        </span>
      </li>
    </div>
  );
};

export default IngredientCard;
