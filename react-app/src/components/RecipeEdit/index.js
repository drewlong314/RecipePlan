import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getAllRecipes, editRecipe } from "../../store/recipes";

const RecipeEdit = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const user = useSelector((state) => state.session.user);
  const recipes = useSelector((state) => state.recipeReducer.recipes);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [servings, setServings] = useState(0);
  const [time, setTime] = useState(0);
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    if (recipes === null) {
      dispatch(getAllRecipes());
    } else {
      console.log(recipes);
      const recipe = recipes.filter((recipe) => {
        return recipe.id === Number(id);
      });
      console.log(recipe[0].name, 'This is recipe')
      setName(recipe[0].name);
      setDescription(recipe[0].description);
      setImage(recipe[0].image);
      setServings(recipe[0].servings);
      setTime(recipe[0].time);
      setInstructions(recipe[0].instructions);
    }
  }, [recipes]);

  const createEdit = (e) => {
    e.preventDefault();
    dispatch(
      editRecipe(
        name,
        description,
        image,
        servings,
        time,
        instructions,
        user.id,
        Number(id)
      )
    );
    dispatch(getAllRecipes())
    history.push("/recipes")
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
          ></input>
        </div>
        <div>
          <label>Recipe Description</label>
          <textarea
            type="text"
            name="description"
            onChange={(e) => {
              console.log(description);
              setDescription(e.target.value);
            }}
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
          <button type="submit">Submit Changes</button>
        </div>
      </form>
    </div>
  );
};

export default RecipeEdit;
