import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addCurrentIngredient } from "../../store/ingredients";
import { postRecipe } from "../../store/recipes";
import IngredientCard from "../IngredientCard";
import "./style.css";

const RecipeCreate = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const currentIngredients = useSelector(
    (state) => state.ingredientReducer.current
  );
  const measurements = useSelector(
    (state) => state.measurementReducer.measurements
  );
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [servings, setServings] = useState();
  const [prep, setPrep] = useState();
  const [cook, setCook] = useState();
  const [instructions, setInstructions] = useState("");
  const [category1, setCategory1] = useState(0);
  const [category2, setCategory2] = useState(0);
  const [category3, setCategory3] = useState(0);
  const [category4, setCategory4] = useState(0);
  const [ingredient, setIngredient] = useState("");
  const [measurement, setMeasurement] = useState("");
  const [quantity, setQuantity] = useState();
  const [ingredientList, setIngredientList] = useState([]);
  const [count, setCount] = useState(0);
  const [categoryError, setCategoryError] = useState(false);
  const [ingredientError, setIngredientError] = useState(false);

  const createRecipe = (e) => {
    e.preventDefault();
    if (!category1 && !category2 && !category3 && !category4) {
      setCategoryError(true);
      return;
    }
    setCategoryError(false);
    if (currentIngredients.length === 0) {
      setIngredientError(true);
      return;
    }
    setIngredientError(false);
    dispatch(
      postRecipe(
        name,
        description,
        image,
        servings,
        prep+cook,
        instructions,
        user.id,
        [category1, category2, category3, category4],
        ingredientList
      )
    );
    history.push("/recipes");
  };

  useEffect(() => {
    setIngredientList(currentIngredients);
  }, [ingredientList, count, currentIngredients]);

  const addIngredient = (e) => {
    e.preventDefault();
    setIngredientError(false);
    dispatch(
      addCurrentIngredient({
        key: count,
        quantity: quantity,
        measurement: measurement,
        ingredient: ingredient,
        identifier: count,
      })
    );
    setCount(count + 1);
    setQuantity(0);
    setMeasurement("");
    setIngredient("");
  };

  const isEmpty = (field) => {
    console.log(field, !!field);
    if (!field) console.log("This field is empty");
  };

  //========== Creates an array for the Servings Select ==============
  const oneToEighteenArray = () => {
    let array = [];
    for (let i = 1; i <= 18; i++) {
      array.push(i);
    }
    return array;
  };

  //========== Creates an array for the Time Selects ==============
  const increaseBy5 = () => {
    let array = [];
    for (let i = 5; i <= 120; i += 5) {
      array.push(i);
    }
    return array;
  };

  return (
    <div className={"create-container"}>
      <form className={"create-form"} onSubmit={createRecipe}>
        <div>
          <input
            className={"create-input"}
            type="text"
            name="name"
            onChange={(e) => {
              isEmpty(e.target.value);
              setName(e.target.value);
            }}
            value={name}
            required={true}
            placeholder={"Recipe Name"}
          ></input>
        </div>
        <div>
          <textarea
            className={"create-textarea"}
            type="text"
            name="description"
            onChange={(e) => {
              isEmpty(e.target.value);
              setDescription(e.target.value);
            }}
            value={description}
            required={true}
            placeholder={"Recipe Description"}
          ></textarea>
        </div>
        <div>
          <input
            className={"create-input"}
            type="url"
            name="image"
            onChange={(e) => {
              isEmpty(e.target.value);
              setImage(e.target.value);
            }}
            value={image}
            required={true}
            placeholder={"Recipe Image Url"}
          ></input>
        </div>
        <div>
          <span>Number of Servings </span>
          <select
            className={"create-select"}
            type="number"
            name="servings"
            onChange={(e) => {
              isEmpty(e.target.value);
              setServings(e.target.value);
            }}
            value={servings}
            required={true}
            // placeholder={'Number of Servings'}
          >
            {oneToEighteenArray().map((num) => {
              return <option>{num}</option>;
            })}
          </select>
        </div>
        <div>
          <span>Time to Prepare</span>
          <select
            className={"create-select"}
            type="number"
            name="prep"
            onChange={(e) => {
              isEmpty(e.target.value);
              setPrep(e.target.value);
            }}
            value={prep}
            required={true}
            placeholder={"Time to Prepare"}
          >
            {increaseBy5().map((num) => {
              return <option>{num}</option>;
            })}
          </select>
          </div>
          <div>
          <span>Time to Cook</span>
          <select
            className={"create-select"}
            type="number"
            name="cook"
            onChange={(e) => {
              isEmpty(e.target.value);
              setCook(e.target.value);
            }}
            value={cook}
            required={true}
            placeholder={"Time to cook"}
          >
            {increaseBy5().map((num) => {
              return <option>{num}</option>;
            })}
          </select>
        </div>
        <div>
          <input
            type="number"
            value={quantity}
            onChange={(e) => {
              isEmpty(e.target.value);
              setQuantity(e.target.value);
            }}
            required={true}
          ></input>
          <select
            value={measurement}
            onChange={(e) => {
              setMeasurement(e.target.value);
            }}
          >
            {measurements.map((measurement) => {
              return (
                <option key={measurement.name} value={measurement.name}>
                  {measurement.name}
                </option>
              );
            })}
          </select>
          <input
            onChange={(e) => {
              isEmpty(e.target.value);
              setIngredient(e.target.value);
            }}
            placeholder="eggs"
            value={ingredient}
          ></input>
          <button onClick={addIngredient}>Add Ingredient</button>
          <ul className="ingredient_list"></ul>
        </div>
        <div>
          {currentIngredients.map((ingredientObject) => {
            return (
              <IngredientCard
                key={ingredientObject.key}
                quantity={ingredientObject.quantity}
                measurement={ingredientObject.measurement}
                ingredient={ingredientObject.ingredient}
                identifier={ingredientObject.identifier}
              />
            );
          })}
          {ingredientError ? (
            <p>You must select at least one ingredient.</p>
          ) : null}
        </div>
        <div>
          <textarea
            className={"create-textarea"}
            type="text"
            name="instructions"
            onChange={(e) => {
              isEmpty(e.target.value);
              setInstructions(e.target.value);
            }}
            value={instructions}
            required={true}
            placeholder={"Recipe Instructions"}
          ></textarea>
        </div>
        <div>
          <button
            className={category1 === 0 ? null : "category_chosen"}
            onClick={(e) => {
              e.preventDefault();
              category1 === 0 ? setCategory1(1) : setCategory1(0);
            }}
            value={category1}
          >
            Breakfast
          </button>
          <button
            className={category2 === 0 ? null : "category_chosen"}
            onClick={(e) => {
              e.preventDefault();
              category2 === 0 ? setCategory2(2) : setCategory2(0);
            }}
            value={category2}
          >
            Lunch
          </button>
          <button
            className={category3 === 0 ? null : "category_chosen"}
            onClick={(e) => {
              e.preventDefault();
              category3 === 0 ? setCategory3(3) : setCategory3(0);
            }}
            value={category3}
          >
            Dinner
          </button>
          <button
            className={category4 === 0 ? null : "category_chosen"}
            onClick={(e) => {
              e.preventDefault();
              category4 === 0 ? setCategory4(4) : setCategory4(0);
            }}
            value={category4}
          >
            Dessert
          </button>
          {categoryError ? <p>You must select at least one category.</p> : null}
        </div>
        <div>
          <button type="submit">Create Recipe</button>
        </div>
      </form>
    </div>
  );
};

export default RecipeCreate;
