import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { postRecipe } from "../../store/recipes";

const RecipeCreate = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
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
        [category1, category2, category3, category4]
      )
    );
    history.push("/recipes");
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
          <input
            type="checkbox"
            onChange={() =>
              category1 === 0 ? setCategory1(1) : setCategory1(0)
            }
            value={category1}
          ></input>
          <label>Breakfast</label>
          <input
            type="checkbox"
            onChange={() =>
              category2 === 0 ? setCategory2(2) : setCategory2(0)
            }
            value={category2}
          ></input>
          <label>Lunch</label>
          <input
            type="checkbox"
            onChange={() =>
              category3 === 0 ? setCategory3(3) : setCategory3(0)
            }
            value={category3}
          ></input>
          <label>Dinner</label>
          <input
            type="checkbox"
            onChange={() =>
              category4 === 0 ? setCategory4(4) : setCategory4(0)
            }
            value={category4}
          ></input>
          <label>Dessert</label>
        </div>
        <div>
          <button type="submit">Create Recipe</button>
        </div>
      </form>
    </div>
  );
};

export default RecipeCreate;
