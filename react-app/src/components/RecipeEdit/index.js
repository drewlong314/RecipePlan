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
  const [categoryError, setCategoryError] = useState(false)
  const [ingredientError, setIngredientError] = useState(false)

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
          key:i,
          quantity:amount,
          measurement:data.info[0],
          ingredient:data.info[1],
          ingredient_id:ingredient,
          recipe_id:id,
          identifier:i,
      }
      )
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
      setCategoryError(true)
      return
    }
    setCategoryError(false)
    if (currentIngredients.length === 0) {
      setIngredientError(true)
      return
    }
    setIngredientError(false)
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
    history.push("/recipes");
  };

  const addIngredient = (e) => {
    e.preventDefault();
    if (!ingredient) {
      setIngredientError(true)
      return
    }
    setIngredientError(false)
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

  return (
    <div>
      <h1>Edit Recipe Page </h1>
      <form onSubmit={createEdit}>
        <div>
          <label>Recipe Name</label>
          <input
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required={true}
          ></input>
        </div>
        <div>
          <label>Recipe Description</label>
          <textarea
            type="text"
            name="description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            value={description}
            required={true}
          ></textarea>
        </div>
        <div>
          <label>Recipe Image</label>
          <input
            type="url"
            name="image"
            onChange={(e) => setImage(e.target.value)}
            value={image}
            required={true}
          ></input>
        </div>
        <div>
          <label>Recipe Servings</label>
          <input
            type="number"
            name="servings"
            onChange={(e) => setServings(e.target.value)}
            value={servings}
            required={true}
          ></input>
        </div>
        <div>
          <label>Time Needed To Cook</label>
          <input
            type="number"
            name="time"
            onChange={(e) => setTime(e.target.value)}
            value={time}
            required={true}
          ></input>
        </div>
        <div>
          <label>Recipe Instructions</label>
          <textarea
            type="text"
            name="instructions"
            onChange={(e) => setInstructions(e.target.value)}
            value={instructions}
            required={true}
          ></textarea>
        </div>
        <div>
          Time of Day:
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
          <span>Ingredients:</span>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
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
            onChange={(e) => setIngredient(e.target.value)}
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
          {ingredientError ? <p>You must select at least one ingredient.</p> : null}
        </div>
        <div>
          <button type="submit">Submit Changes</button>
        </div>
      </form>
    </div>
  );
};

export default RecipeEdit;
