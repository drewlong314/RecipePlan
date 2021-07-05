const SET_INGREDIENT = "ingredients/SET_INGREDIENT";

const setIngredient = (ingredient) => ({
  type: SET_INGREDIENT,
  payload: ingredient,
});

export const getAllIngredients = () => async (dispatch) => {
  const res = await fetch("/api/ingredients/");
  const data = await res.json();
  dispatch(setIngredient(data));
};

const initialState = { ingredients: [] };

export default function ingredientReducer(state = initialState, action) {
  switch (action.type) {
    case SET_INGREDIENT:
      return (state.ingredients = action.payload);
    default:
      return state;
  }
}
