const SET_MEASUREMENT = "measurements/SET_MEASUREMENT";

const setMeasurement = (measurement) => ({
  type: SET_MEASUREMENT,
  payload: measurement,
});

export const getAllMeasurements = () => async (dispatch) => {
  const res = await fetch("/api/measurements/");
  const data = await res.json();
  dispatch(setMeasurement(data));
};

const initialState = { measurements: [] };

export default function measurementReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MEASUREMENT:
      return (state.measurements = action.payload);
    default:
      return state;
  }
}
