import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteRecipe } from "../../store/recipes";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentIngredient } from "../../store/ingredients";
import RecipeCard from "../RecipeCard";
import Navigation from "../Navigation";
import "./style.css";
import SearchFilter from "../SearchFilter";

const RecipeList = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipeReducer.recipes);
  const [searchResults, setSearchResults] = useState([]);
  const [filterCategory, setFilterCategory] = useState(null);
  const [filterSearch, setFilterSearch] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    dispatch(setCurrentIngredient([]));
  }, []);

  useEffect(() => {
    if (filterCategory) {
      if (searchResults.length) {
      const filtered = searchResults.filter((recipe) => {
        for (let i = 0; i < recipe.categories.length; i++) {
          return recipe.categories[i].id === filterCategory
        }
      })
      setFilterSearch(filtered)
      }
      else {
        const filtered = allRecipes.filter((recipe) => {
          for (let i = 0; i < recipe.categories.length; i++) {
            return recipe.categories[i].id === filterCategory
          }
        })
        setFilterSearch(filtered)
      }
    }
    else {
      setFilterSearch([])
    }
  }, [filterCategory])

  const handleSearch = async (input) => {
    const res = await fetch(`/api/search/${input}`);
    const json = await res.json();
    setInput(input)
    setSearchResults(json["recipes"]);
  };

  return (
    <>
      <Navigation title={"Recipes"} other={"add"} />

      <div className={"list-container"}>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
        value={input}
          onChange={(e) => {
            if (e.target.value) {
              handleSearch(e.target.value);
            }
            else {
              setSearchResults([])
              setInput('')
            }
          }}
        ></input>
      </form>
        <div className={"list-cards"}>
          <div className={"list-filter"}>
          <SearchFilter setFilterCategory={setFilterCategory}/>
          </div>
          {!input.length && filterCategory ? filterSearch?.map((recipe) => {
            return <RecipeCard key={recipe.id} recipe={recipe}></RecipeCard>;
          }) : null}
          {input.length && filterCategory ? filterSearch?.map((recipe) => {
            return <RecipeCard key={recipe.id} recipe={recipe}></RecipeCard>;
          }) : null}
          {input.length && !filterCategory ? searchResults?.map((recipe) => {
            return <RecipeCard key={recipe.id} recipe={recipe}></RecipeCard>;
          }) : null}
          {!input.length && !filterCategory ? allRecipes?.map((recipe) => {
            return <RecipeCard key={recipe.id} recipe={recipe}></RecipeCard>;
          }) : null}
        </div>
      </div>
    </>
  );
};

export default RecipeList;
