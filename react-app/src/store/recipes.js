const SET_RECIPES = "recipes/SET_RECIPES";

const setRecipes = (recipes) => ({
    type: SET_RECIPES,
    payload: recipes,
  });

export const getAllRecipes = () => async (dispatch) => {
    const res = await fetch("/api/recipes")
    const data = await res.json()
    console.log(data, '-------------')
    dispatch(setRecipes(data))
}

const initialState = { recipes: null}

export default function recipeReducer(state = initialState, action) {
    switch (action.type) {
      case SET_RECIPES:
        return state.recipes = action.payload
    //   case REMOVE_RECIPE: // this needs to be changed
    //     return { recipes: null };
      default:
        return state;
    }
  }
