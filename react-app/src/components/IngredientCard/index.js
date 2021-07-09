import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editIngredient,
  removeCurrentIngredient,
  removeIngredient,
} from "../../store/ingredients";
import "./style.css";

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

  const oneToEighteenArray = () => {
    let array = [];
    for (let i = 1; i <= 18; i++) {
      array.push(i);
    }
    return array;
  };

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
    <div className={'ingredient-container'}>
      {show === false && (
        <li>
          {`${quantityUsed} ${measurementUsed} ${ingredientUsed}`}
          <span>
            <button className={'ingredient-edit'} onClick={showEditIngredient} type="button">
              Edit
            </button>
            <button className={'ingredient-remove'} onClick={removeAnIngredient} type="button">
              Remove
            </button>
          </span>
        </li>
      )}
      {show === true && (
        <div className={'ingredient-edit__container'}>
          <select
              value={quantityUsed}
              onChange={(e) => setQuantityUsed(e.target.value)}
              required={true}
            >
              {oneToEighteenArray().map((num) => {
              return <option key={num}>{num}</option>;
            })}
            </select>
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
            <button className={'ingredient-edit__button'} onClick={submitEditIngredient}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default IngredientCard;
