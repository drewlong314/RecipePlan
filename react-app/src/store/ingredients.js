const SET_INGREDIENT = "ingredients/SET_INGREDIENT";
const SET_CURRENT = "ingredients/SET_CURRENT";
const ADD_CURRENT = "ingredients/ADD_CURRENT";

const setIngredient = (ingredient) => ({
  type: SET_INGREDIENT,
  payload: ingredient,
});

export const setCurrentIngredient = (ingredient) => ({
  type: SET_CURRENT,
  payload: ingredient,
});

export const addCurrentIngredient = (ingredient) => ({
  type: ADD_CURRENT,
  payload: ingredient,
});

export const getAllIngredients = () => async (dispatch) => {
  const res = await fetch("/api/ingredients/");
  const data = await res.json();
  dispatch(setIngredient(data));
};

const initialState = { ingredients: [], current: [] };

export default function ingredientReducer(state = initialState, action) {
  switch (action.type) {
    case SET_INGREDIENT:
      state.ingredients = action.payload.ingredients;
      return state;
    case SET_CURRENT:
      return (state.current = action.payload);
    case ADD_CURRENT:
        (state.current = [...state.current, action.payload]);
      return state
    default:
      return state;
  }
}
