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
  const [categories, setCategories] = useState([]); // This is probaly not needed
  const [category1, setCategory1] = useState(0);
  const [category2, setCategory2] = useState(0);
  const [category3, setCategory3] = useState(0);
  const [category4, setCategory4] = useState(0);

  console.log(recipes);
  useEffect(() => {
    if (recipes) {
      console.log(recipes);
      const recipe = recipes?.filter((recipe) => {
        return recipe.id === Number(id);
      });
      console.log(recipe[0].name, "This is recipe");
      setName(recipe[0].name);
      setDescription(recipe[0].description);
      setImage(recipe[0].image);
      setServings(recipe[0].servings);
      setTime(recipe[0].time);
      setInstructions(recipe[0].instructions);
      setCategories(recipe[0].categories)
      console.log('--------------------', recipe[0].categories)
      recipe[0].categories.forEach(cat => {
        console.log(cat)
        if (cat.name === "Breakfast") setCategory1(1)
        if (cat.name === "Lunch") setCategory2(2)
        if (cat.name === "Dinner") setCategory3(3)
        if (cat.name === "Dessert") setCategory4(4)
      });
    }
  }, [recipes]);

  const createEdit = async (e) => {
    e.preventDefault();
    console.log(category1, category2, category3, category4)
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
        [category1, category2, category3, category4]
      )
    );
    // dispatch(getAllRecipes())
    history.push("/recipes");
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
          Time of Day:
          <input
            type="checkbox"
            onChange={() =>
              category1 === 0 ? setCategory1(1) : setCategory1(0)
            }
            checked={category1}
            value={category1}
          ></input>
          <label>Breakfast</label>
          <input
            type="checkbox"
            onChange={() =>
              category2 === 0 ? setCategory2(2) : setCategory2(0)
            }
            checked={category2}
            value={category2}
          ></input>
          <label>Lunch</label>
          <input
            type="checkbox"
            onChange={() =>
              category3 === 0 ? setCategory3(3) : setCategory3(0)
            }
            checked={category3}
            value={category3}
          ></input>
          <label>Dinner</label>
          <input
            type="checkbox"
            onChange={() =>
              category4 === 0 ? setCategory4(4) : setCategory4(0)
            }
            checked={category4}
            value={category4}
          ></input>
          <label>Dessert</label>
        </div>
        <div>
          <button type="submit">Submit Changes</button>
        </div>
      </form>
    </div>
  );
};

export default RecipeEdit;
