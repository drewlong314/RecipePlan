import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Calendar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>New Notebook</h1>
      <label>
        <input
          placeholder="Name of Notebook"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <div></div>
      <button type="submit">Continue</button>
    </form>
  );
}

export default Calendar;
