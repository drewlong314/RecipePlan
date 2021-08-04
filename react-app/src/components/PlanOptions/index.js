import React, { useState } from "react";

const PlanOptions = ({ meal }) => {
  const [options, setOptions] = useState(false);
  return (
    <div className={"calendar-box"}>
      {options ? (
        <div className={"calendar-options"}>
          <button className={"calendar-options__x"} onClick={(e) => setOptions(false)}>X</button>
          <button className={"calendar-options__button"}>Add recipe</button>
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
