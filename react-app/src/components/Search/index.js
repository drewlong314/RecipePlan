import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Search = (input) => {
  const allRecipes = useSelector((state) => state.recipeReducer.recipes);
  const [searchResults, setSearchResults] = useState([]);
  const [filterCategory, setFilterCategory] = useState(null);
  const [filterSearch, setFilterSearch] = useState([]);

  const handleSearch = async (input) => {
    const res = await fetch(`/api/search/${input}`);
    const json = await res.json();
    console.log(json["projects"]);
    setSearchResults(json["projects"]);
  };

  useEffect(() => {
    handleSearch(input);
  }, [input]);

  useEffect(() => {
    console.log(searchResults, input);
  }, [searchResults]);

  useEffect(() => {
    console.log(filterCategory, "-----------------------------")
    if (filterCategory) {
      const filtered = searchResults.filter((project) => {
        return project.category_id === filterCategory
      })
      setFilterSearch(filtered)
      console.log(filtered)
    }
    else {
      setFilterSearch([])
    }
  }, [filterCategory])

  return (
    <form>
      <input></input>
    </form>
  );
};

export default Search;
