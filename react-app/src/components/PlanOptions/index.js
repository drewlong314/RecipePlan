import React, { useState } from "react";
import CalendarModal from "../CalendarModal";

const PlanOptions = ({ meal, day, time }) => {
  const [options, setOptions] = useState(false);
  const [modal, setModal] = useState(false)
  const addRecipe = () => {
      setModal(true)
      // this will open the modal that contains the search bar
  }

  // How can you tell if the box already has a recipe in it
  console.log(meal[1])
  return (
    <div className={"calendar-box"}>
      {options && meal[1] && (
        <div className={"calendar-options"}>
          <button className={"calendar-options__x"} onClick={(e) => setOptions(false)}>X</button>
          <button className={"calendar-options__button"}>Remove recipe</button>
          {/* <CalendarModal day={day} time={time}/> */}
        </div>
      )}
      {options && !meal[1] && (
        <div className={"calendar-options"}>
          <button className={"calendar-options__x"} onClick={(e) => setOptions(false)}>X</button>
          <CalendarModal day={day} time={time}/>
          {/* <button className={"calendar-options__button"}>Remove recipe</button> */}
        </div>
      )}
      {!options && (
        <div className={'calendar-options'}>
          <button
            className={"calendar-options__dots"}
            onClick={(e) => setOptions(true)}
          >
            ...
          </button>
        </div>
      )}
      {meal[0]}
    </div>
  );
};

export default PlanOptions;
