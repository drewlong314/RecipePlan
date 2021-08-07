import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  addCurrentIngredient,
  setCurrentIngredients,
} from "../../store/ingredients";
import { getAllRecipes, editRecipe } from "../../store/recipes";
import IngredientCard from "../IngredientCard";
import "./style.css";

const RecipeEdit = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const user = useSelector((state) => state.session.user);
  const recipes = useSelector((state) => state.recipeReducer.recipes);
  const currentIngredients = useSelector(
    (state) => state.ingredientReducer.current
  );
  const measurements = useSelector(
    (state) => state.measurementReducer.measurements
  );
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [servings, setServings] = useState(0);
  const [time, setTime] = useState(0);
  const [instructions, setInstructions] = useState("");
  const [categories, setCategories] = useState([]);
  const [category1, setCategory1] = useState(0);
  const [category2, setCategory2] = useState(0);
  const [category3, setCategory3] = useState(0);
  const [category4, setCategory4] = useState(0);
  const [ingredient, setIngredient] = useState("");
  const [measurement, setMeasurement] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [ingredientList, setIngredientList] = useState([]);
  const [count, setCount] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [ingredientError, setIngredientError] = useState(false);

  const convertRecipe = async (amount, measurement, ingredient, i) => {
    const res = await fetch("/api/recipes/convert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        measurement,
        ingredient,
      }),
    });
    const data = await res.json();

    dispatch(
      addCurrentIngredient({
        key: i,
        quantity: amount,
        measurement: data.info[0],
        ingredient: data.info[1],
        ingredient_id: ingredient,
        recipe_id: id,
        identifier: i,
      })
    );
  };

  useEffect(() => {
    if (recipes) {
      const recipe = recipes.filter((recipe) => {
        return recipe.id === Number(id);
      });
      setName(recipe[0].name);
      setDescription(recipe[0].description);
      setImage(recipe[0].image);
      setServings(recipe[0].servings);
      setTime(recipe[0].time);
      setInstructions(recipe[0].instructions);
      setCategories(recipe[0].categories);
      if (loaded === false) {
        let i = 0;
        recipe[0].recipe_ingredients.map((ingredient) => {
          convertRecipe(
            ingredient.amount,
            ingredient.measurement_id,
            ingredient.ingredient_id,
            i
          );
          i++;
        });
        setCount(i);
        setLoaded(true);
      }

      setIngredientList(currentIngredients);
      recipe[0].categories.forEach((cat) => {
        if (cat.name === "Breakfast") setCategory1(1);
        if (cat.name === "Lunch") setCategory2(2);
        if (cat.name === "Dinner") setCategory3(3);
        if (cat.name === "Dessert") setCategory4(4);
      });
    }
  }, [recipes, currentIngredients, count]);

  const createEdit = async (e) => {
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
      editRecipe(
        name,
        description,
        image,
        servings,
        time,
        instructions,
        user.id,
        Number(id),
        [category1, category2, category3, category4],
        ingredientList
      )
    );
    history.push(`/recipes/${Number(id)}`); // this should go to the recipes/id
  };

  const addIngredient = (e) => {
    e.preventDefault();
    if (!ingredient) {
      setIngredientError(true);
      return;
    }
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
    <div className={"edit-container"}>
      <form className={"edit-form"} onSubmit={createEdit}>
        <div>
          <p className={"edit-label"}>Recipe Name</p>
          <input
            className={"edit-input"}
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required={true}
            placeholder={"Chicken Alfredo"}
          ></input>
        </div>
        <div>
          <p className={"edit-label"}>Recipe Description</p>
          <textarea
            className={"edit-textarea"}
            type="text"
            name="description"
            onChange={(e) => {
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
          <p className={"edit-label"}>Recipe Image</p>
          <input
            className={"edit-input"}
            type="url"
            name="image"
            onChange={(e) => setImage(e.target.value)}
            value={image}
            required={true}
          ></input>
        </div>
        <div className={"edit-select__container"}>
          <div className={"edit-select__div"}>
            <p>Recipe Servings</p>
            <select
              className={"edit-select"}
              name="servings"
              onChange={(e) => setServings(e.target.value)}
              value={servings}
              required={true}
            >
              {oneToEighteenArray().map((num) => {
                return <option key={num}>{num}</option>;
              })}
            </select>
          </div>
          <div className={"edit-select__div"}>
            <p>Total Time</p>
            <select
              className={"edit-select"}
              type="number"
              name="time"
              onChange={(e) => setTime(e.target.value)}
              value={time}
              required={true}
            >
              {increaseBy5().map((num) => {
                return <option key={num}>{num}</option>;
              })}
            </select>
          </div>
        </div>
        <div className={'edit-ingredient__container'}>
          <select
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
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
            onChange={(e) => setIngredient(e.target.value)}
            placeholder="Chicken"
            value={ingredient}
          ></input>
          <button className={'edit-ingredient__button'} onClick={addIngredient}>Add Ingredient</button>
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
            className={"edit-textarea"}
            type="text"
            name="instructions"
            onChange={(e) => setInstructions(e.target.value)}
            value={instructions}
            required={true}
            placeholder={`Wash chicken breast then pat dry. Cut into thin strips. Boil fettuccine pasta according to box instructions, when ready, set aside. Heat a non-stick pan with olive oil and add chicken strips. Cook for 6-7 minutes on each side until golden brown, on medium heat. Remove chicken from pan when ready and set aside. Add minced garlic and saute for 3 minutes. Deglaze pan with chicken stock, add lemon juice and bring to boil. Add heavy cream, then add the cooked pasta and chicken. Add parmesan and stir until everything is well combined. Sprinkle with parsley and enjoy!`}
          ></textarea>
        </div>
        <div className={'edit-category__container'}>
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
          <button className={'edit-submit'} type="submit">Submit Changes</button>
        </div>
      </form>
    </div>
  );
};

export default RecipeEdit;
