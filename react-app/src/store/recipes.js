const SET_RECIPES = "recipes/SET_RECIPES";
const ADD_RECIPE = "recipes/ADD_RECIPE";
const UPDATE_RECIPE = "recipes/UPDATE_RECIPE";
const REMOVE_RECIPE = "recipes/REMOVE_RECIPE";

const setRecipes = (recipes) => ({
  type: SET_RECIPES,
  payload: recipes,
});

const addRecipe = (recipe) => ({
  type: ADD_RECIPE,
  payload: recipe,
});

const updateRecipe = (recipe) => ({
  type: UPDATE_RECIPE,
  payload: recipe,
});

const removeRecipe = (recipe) => ({
  type: REMOVE_RECIPE,
  payload: recipe,
});

export const getAllRecipes = (user) => async (dispatch) => {
  const res = await fetch(`/api/recipes/${user.id}`);
  const data = await res.json();
  dispatch(setRecipes(data));
};

export const postRecipe =
  (name, description, image, servings, time, instructions, user_id, category, ingredient_list) =>
  async (dispatch) => {
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
        category: [category],
        ingredient_list: [ingredient_list]
      }),
    });
    const data = await res.json();
    if (!data.errors) dispatch(addRecipe(data));
  };

export const editRecipe =
  (name, description, image, servings, time, instructions, user_id, id, categories, ingredient_list, day, plan_category) =>
  async (dispatch) => {
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
        category: [categories],
        ingredient_list: [ingredient_list],
        day,
        plan_category,
      }),
    });
    const data = await res.json();
    if (!data.errors) dispatch(updateRecipe(data));
  };

export const deleteRecipe = (id) => async (dispatch) => {
  const res = await fetch(`/api/recipes/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  dispatch(removeRecipe(data));
};

const initialState = { recipes: null };

export default function recipeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_RECIPES:
      return (state.recipes = action.payload);
    case ADD_RECIPE:
      const newState = [...state.recipes];
      newState.push(action.payload);
      return (state.recipes = { recipes: newState });
    case UPDATE_RECIPE:
      const updateState = [...state.recipes];
      const recipe = updateState.filter((recipe) => {
        return recipe.id === action.payload.id;
      });
      recipe[0].name = action.payload.name;
      recipe[0].description = action.payload.description;
      recipe[0].image = action.payload.image;
      recipe[0].servings = action.payload.servings;
      recipe[0].time = action.payload.time;
      recipe[0].instructions = action.payload.instructions;
      recipe[0].categories = action.payload.categories
      recipe[0].recipe_ingredients = action.payload.recipe_ingredients
      recipe[0].day = action.payload.day
      recipe[0].plan_category = action.payload.plan_category
      return (state.recipes = { recipes: updateState });
    case REMOVE_RECIPE:
        const deleteState = [...state.recipes]
        const recipeToDelete = deleteState.filter((recipe) => {
            return recipe.id === action.payload.id
        })
        deleteState.splice(deleteState.indexOf(recipeToDelete[0]), 1)
        return (state.recipes = {recipes: deleteState})
    default:
      return state;
  }
}
