import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteRecipe } from "../../store/recipes";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentIngredient } from "../../store/ingredients";
import RecipeCard from "../RecipeCard";
import Navigation from "../Navigation";
import "./style.css";
import SearchBar from "../SearchBar";

const RecipeList = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipeReducer.recipes);
  const [searchResults, setSearchResults] = useState([]);
  const [filterCategory, setFilterCategory] = useState(null);
  const [filterSearch, setFilterSearch] = useState([]);

  useEffect(() => {
    dispatch(setCurrentIngredient([]));
  }, []);

  const handleSearch = async (input) => {
    const res = await fetch(`/api/search/${input}`);
    const json = await res.json();
    console.log(json["recipes"]);
    console.log(allRecipes)
    setSearchResults(json["recipes"]);
  };

  return (
    <>
      <Navigation title={"Recipes"} other={"add"} />
      <form>
        <input
          onChange={(e) => {
            if (e.target.value) {
              handleSearch(e.target.value);
            }
            else setSearchResults([])
          }}
        ></input>
      </form>
      <div className={"list-container"}>
        <div className={"list-cards"}>
          {searchResults.length ? searchResults?.map((recipe) => {
            return <RecipeCard key={recipe.id} recipe={recipe}></RecipeCard>;
          }) : allRecipes?.map((recipe) => {
            return <RecipeCard key={recipe.id} recipe={recipe}></RecipeCard>;
          })}
          {/* {allRecipes?.map((recipe) => {
            return <RecipeCard key={recipe.id} recipe={recipe}></RecipeCard>;
          })} */}
        </div>
      </div>
    </>
  );
};

export default RecipeList;
