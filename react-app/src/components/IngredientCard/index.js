import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editIngredient,
  removeCurrentIngredient,
  removeIngredient,
} from "../../store/ingredients";

const IngredientCard = ({
  quantity,
  measurement,
  ingredient,
  identifier,
  ingredient_id,
  recipe_id,
}) => {
  const dispatch = useDispatch();
  const currentIngredients = useSelector(
    (state) => state.ingredientReducer.current
  );
  const measurements = useSelector(
    (state) => state.measurementReducer.measurements
  );
  const [quantityUsed, setQuantityUsed] = useState(quantity)
  const [measurementUsed, setMeasurementUsed] = useState(measurement)
  const [ingredientUsed, setIngredientUsed] = useState(ingredient)
  const [show, setShow] = useState(false);

  // useEffect(() => {

  // }, [quantityUsed, measurementUsed, ingredientUsed])

  const removeAnIngredient = () => {

    const ingredientToRemove = currentIngredients.filter((ingredient) => {
      return ingredient.identifier === identifier;
    });
    if (recipe_id) dispatch(removeIngredient(ingredientToRemove[0]));
    else dispatch(removeCurrentIngredient(ingredientToRemove[0]));
  };
  const showEditIngredient = () => {
    setShow(true);
  };
  const submitEditIngredient = () => {
    const ingredientToEdit = currentIngredients.filter((ingredient) => {
      return ingredient.identifier === identifier;
    });
    dispatch(editIngredient(ingredientToEdit[0], ingredientUsed, measurementUsed, quantityUsed))
    setShow(false)
  }
  return (
    <div>
      {show === false && (
        <li>
          {`${quantityUsed} ${measurementUsed} ${ingredientUsed}`}
          <span>
            <button onClick={showEditIngredient} type="button">
              Edit
            </button>
            <button onClick={removeAnIngredient} type="button">
              Remove
            </button>
          </span>
        </li>
      )}
      {show === true && (
        <div>
          <input
              type="number"
              value={quantityUsed}
              onChange={(e) => setQuantityUsed(e.target.value)}
            ></input>
            <select
              value={measurementUsed}
              onChange={(e) => {
                setMeasurementUsed(e.target.value);
              }}
            >
              {measurements.map((measurement) => {
                return (
                  <option key={measurement.name} value={measurement.name}>{measurement.name}</option>
                );
              })}
            </select>
            <input
              onChange={(e) => setIngredientUsed(e.target.value)}
              placeholder="eggs"
              value={ingredientUsed}
            ></input>
            <button onClick={submitEditIngredient}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default IngredientCard;
