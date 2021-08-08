import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MiniRecipeCard from "../MiniRecipeCard";
import RecipeCard from "../RecipeCard";
import "./style.css";

function Calendar({day, time}) {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipeReducer.recipes);
  const [searchResults, setSearchResults] = useState([]);
  const [filterCategory, setFilterCategory] = useState(null);
  const [filterSearch, setFilterSearch] = useState([]);
  const [input, setInput] = useState("");

  const handleSearch = async (input) => {
    const res = await fetch(`/api/search/${input}`);
    const json = await res.json();
    setSearchResults(json["recipes"]);
  };

  return (
    <div className={'mini-container'}>
      <form
        className={"mini-search__container"}
        onSubmit={(e) => e.preventDefault()}
      >
        <label>
          <input
            className={"mini-search"}
            type="text"
            value={input}
            onChange={(e) => {
              if (e.target.value) {
                setInput(e.target.value);
                handleSearch(e.target.value);
              } else {
                setSearchResults([]);
                setInput("");
              }
            }}
          />
        </label>
      </form>
      <div className={"mini-recipe-container"}>
        <div className={"mini-recipe-inner"}>
          {input.length ? searchResults?.map((recipe) => {
            return <MiniRecipeCard key={recipe.id} recipe={recipe} day={day} time={time}/>
          }) : null}
          {!input.length ? allRecipes?.map((recipe) => {
            return <MiniRecipeCard key={recipe.id} recipe={recipe} day={day} time={time}/>
          }) : null}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
