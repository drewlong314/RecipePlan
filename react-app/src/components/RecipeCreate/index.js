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
  const [servings, setServings] = useState(0);
  const [time, setTime] = useState(0);
  const [instructions, setInstructions] = useState("");
  const [category1, setCategory1] = useState(0);
  const [category2, setCategory2] = useState(0);
  const [category3, setCategory3] = useState(0);
  const [category4, setCategory4] = useState(0);
  const [ingredient, setIngredient] = useState("");
  const [measurement, setMeasurement] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [ingredientList, setIngredientList] = useState([]);
  const [count, setCount] = useState(0);
  // Try an array of arrays [[1, tsp, salt], [2, "", apples]]

  const createRecipe = (e) => {
    e.preventDefault();
    dispatch(
      postRecipe(
        name,
        description,
        image,
        servings,
        time,
        instructions,
        user.id,
        [category1, category2, category3, category4],
        ingredientList
      )
    );
    // history.push("/recipes");
  };

  useEffect(() => {
    console.log(ingredientList);
    console.log("CURRENT", currentIngredients);
    setIngredientList(currentIngredients)
  }, [ingredientList, count, currentIngredients]);


  const addIngredient = (e) => {
    e.preventDefault();
    // setIngredientList([...ingredientList, [quantity, measurement, ingredient]]);
    dispatch(
      addCurrentIngredient(
        <IngredientCard
          key={count}
          quantity={quantity}
          measurement={measurement}
          ingredient={ingredient}
          identifier={count}
        />
      )
    );
    setCount(count + 1);
    setQuantity(0);
    setMeasurement("");
    setIngredient("");
  };

  return (
    <div>
      <h1>Recipe Creation Page </h1>
      <form onSubmit={createRecipe}>
        <div>
          <label>Recipe Name</label>
          <input
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          ></input>
        </div>
        <div>
          <label>Recipe Description</label>
          <textarea
            type="text"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </div>
        <div>
          <label>Recipe Image</label>
          <input
            type="text"
            name="image"
            onChange={(e) => setImage(e.target.value)}
            value={image}
          ></input>
        </div>
        <div>
          <label>Recipe Servings</label>
          <input
            type="number"
            name="servings"
            onChange={(e) => setServings(e.target.value)}
            value={servings}
          ></input>
        </div>
        <div>
          <label>Time Needed To Cook</label>
          <input
            type="number"
            name="time"
            onChange={(e) => setTime(e.target.value)}
            value={time}
          ></input>
        </div>
        <div>
          <label>Recipe Instructions</label>
          <textarea
            type="text"
            name="instructions"
            onChange={(e) => setInstructions(e.target.value)}
            value={instructions}
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
        </div>
        <div>
          <form>
            <span>Ingredients:</span>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            ></input>
            <select
              value={measurement}
              onChange={(e) => {
                console.log(e.target.value);
                setMeasurement(e.target.value);
              }}
            >
              {measurements.map((measurement) => {
                return (
                  <option value={measurement.name}>{measurement.name}</option>
                );
              })}
            </select>
            <input
              onChange={(e) => setIngredient(e.target.value)}
              placeholder="eggs"
              value={ingredient}
            ></input>
            <button onClick={addIngredient}>Add Ingredient</button>
          </form>
          <ul className="ingredient_list"></ul>
        </div>
        <div>{currentIngredients}</div>
        <div>
          <button type="submit">Create Recipe</button>
        </div>
      </form>
    </div>
  );
};

export default RecipeCreate;
