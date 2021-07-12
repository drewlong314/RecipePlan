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
  const [servings, setServings] = useState(1);
  const [prep, setPrep] = useState(5);
  const [cook, setCook] = useState(5);
  const [instructions, setInstructions] = useState("");
  const [category1, setCategory1] = useState(0);
  const [category2, setCategory2] = useState(0);
  const [category3, setCategory3] = useState(0);
  const [category4, setCategory4] = useState(0);
  const [ingredient, setIngredient] = useState("");
  const [measurement, setMeasurement] = useState("");
  const [quantity, setQuantity] = useState(1);
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
        prep + cook,
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
    setQuantity(1);
    setMeasurement("");
    setIngredient("");
  };

  const isEmpty = (field) => {
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
          <p className={"create-label"}>Recipe Name</p>
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
            placeholder={"Chicken Alfredo"}
          ></input>
        </div>
        <div>
          <p className={"create-label"}>Recipe Description</p>
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
            // ========== Recipe Description from https://easychickenrecipes.com/homemade-chicken-alfredo-recipe/ author name: Becky Hardin ==============
            placeholder={
              "This Chicken Alfredo recipe is perfect for a tasty homemade and easy weeknight meal. Made with creamy fettuccini pasta, heavy cream and parmesan, this traditional Italian pasta dish is simple and quick to make."
            }
          ></textarea>
        </div>
        <div>
          <p className={"create-label"}>Image Url</p>
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
            placeholder={"https://"}
          ></input>
        </div>
        <div className={"create-select__container"}>
          <div className={"create-select__div"}>
            <span>Servings</span>
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
                return <option key={num}>{num}</option>;
              })}
            </select>
          </div>
          <div className={"create-select__div"}>
            <span>Prep. Time</span>
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
              // placeholder={"Time to Prepare"}
            >
              {increaseBy5().map((num) => {
                return <option key={num}>{num}</option>;
              })}
            </select>
          </div>
          <div className={"create-select__div"}>
            <span>Cook Time</span>
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
                return <option key={num}>{num}</option>;
              })}
            </select>
          </div>
        </div>
        <div className={'create-ingredient__container'}>
          <select
            value={quantity}
            onChange={(e) => {
              isEmpty(e.target.value);
              setQuantity(e.target.value);
            }}
            required={true}
          >
            {oneToEighteenArray().map((num) => {
              return <option key={num}>{num}</option>;
            })}
          </select>
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
            placeholder="Chicken"
            value={ingredient}
          ></input>
          <button className={'create-ingredient__button'} onClick={addIngredient}>Add Ingredient</button>
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
            //========== Recipe Instructions from https://easychickenrecipes.com/homemade-chicken-alfredo-recipe/ author name: Becky Hardin ==============
            placeholder={`Wash chicken breast then pat dry. Cut into thin strips. Boil fettuccine pasta according to box instructions, when ready, set aside. Heat a non-stick pan with olive oil and add chicken strips. Cook for 6-7 minutes on each side until golden brown, on medium heat. Remove chicken from pan when ready and set aside. Add minced garlic and saute for 3 minutes. Deglaze pan with chicken stock, add lemon juice and bring to boil. Add heavy cream, then add the cooked pasta and chicken. Add parmesan and stir until everything is well combined. Sprinkle with parsley and enjoy!`}
          ></textarea>
        </div>
        <div className={'create-category__container'}>
          <button
            className={category1 === 0 ? 'category' : "category_chosen"}
            onClick={(e) => {
              e.preventDefault();
              category1 === 0 ? setCategory1(1) : setCategory1(0);
            }}
            value={category1}
          >
            Breakfast
          </button>
          <button
            className={category2 === 0 ? 'category' : "category_chosen"}
            onClick={(e) => {
              e.preventDefault();
              category2 === 0 ? setCategory2(2) : setCategory2(0);
            }}
            value={category2}
          >
            Lunch
          </button>
          <button
            className={category3 === 0 ? 'category' : "category_chosen"}
            onClick={(e) => {
              e.preventDefault();
              category3 === 0 ? setCategory3(3) : setCategory3(0);
            }}
            value={category3}
          >
            Dinner
          </button>
          <button
            className={category4 === 0 ? 'category' : "category_chosen"}
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
          <button className={'create-submit'} type="submit">Create Recipe</button>
        </div>
      </form>
    </div>
  );
};

export default RecipeCreate;
