const SET_RECIPES = "recipes/SET_RECIPES";
const ADD_RECIPE = "recipes/ADD_RECIPE";

const setRecipes = (recipes) => ({
  type: SET_RECIPES,
  payload: recipes,
});

const addRecipe = (recipe) => ({
  type: ADD_RECIPE,
  payload: recipe,
});

export const getAllRecipes = () => async (dispatch) => {
  const res = await fetch("/api/recipes");
  const data = await res.json();
  dispatch(setRecipes(data));
};

export const postRecipe = (name, description, image, servings, time, instructions, user_id) => async (dispatch) => {
  const res = await fetch("/api/recipes/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
      image,
      servings,
      time,
      instructions,
      user_id,
    }),
  });
  const data = await res.json();
  dispatch(addRecipe(data));
};

export const editRecipe = (name, description, image, servings, time, instructions, user_id, id) => async (dispatch) => {
    const res = await fetch(`/api/recipes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        image,
        servings,
        time,
        instructions,
        user_id,
      }),
    });
    const data = await res.json();
    dispatch(addRecipe(data));
  };

const initialState = { recipes: null };

export default function recipeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_RECIPES:
      return (state.recipes = action.payload);
    //   case REMOVE_RECIPE: // this needs to be changed
    //     return { recipes: null };
    default:
      return state;
  }
}
