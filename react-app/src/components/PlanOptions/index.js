import React, { useState } from "react";
import CalendarModal from "../CalendarModal";

const PlanOptions = ({ meal, day, time }) => {
  const [options, setOptions] = useState(false);
  const [modal, setModal] = useState(false)
  const addRecipe = () => {
      setModal(true)
      // this will open the modal that contains the search bar
  }
  return (
    <div className={"calendar-box"}>
      {options ? (
        <div className={"calendar-options"}>
          <button className={"calendar-options__x"} onClick={(e) => setOptions(false)}>X</button>
          <CalendarModal day={day} time={time}/>
          {/* <button onClick={addRecipe} className={"calendar-options__button"}>Add recipe</button> */}
          <button className={"calendar-options__button"}>Remove recipe</button>
        </div>
      ) : (
        <div className={'calendar-options'}>
          <button
            className={"calendar-options__dots"}
            onClick={(e) => setOptions(true)}
          >
            ...
          </button>
        </div>
      )}
      {meal}
    </div>
  );
};

export default PlanOptions;
