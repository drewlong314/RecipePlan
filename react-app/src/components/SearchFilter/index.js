import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./style.css";


const SearchFilter = ({setFilterCategory}) => {

    const [showCategories, setShowCategories] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null)

    // const allCategories = useSelector(state => state.allCategories.categories)

    const toggleActions = (e) => {
        e.preventDefault();
        if (!selectedCategory) setShowCategories(!showCategories);
    }

    const unselectCategory = () => {
        if (selectedCategory) selectedCategory.classList.remove('selected-category')
        setSelectedCategory(null)
        setFilterCategory(null)
    }

    const selectCategory = (category, e) => {
        if (selectedCategory) selectedCategory.classList.remove('selected-category')
        setSelectedCategory(e.target)
        e.target.classList.add('selected-category')
        setFilterCategory(category)
    }

    return (
        <div className="results-toggle-container">
            <div className="sort-section">
                <button className={`${showCategories === true ? "selected-toggle" : "results-toggle-button"}`} onClick={e => toggleActions(e)}>Sort By Category</button>
                {showCategories && <div className="sort-categories-list-container">
                    <ul className="sort-categories-list">
                        <li className="sort-category" onClick={(e) => selectCategory(1, e)}>Breakfast</li>
                        <li className="sort-category" onClick={(e) => selectCategory(2, e)}>Lunch</li>
                        <li className="sort-category" onClick={(e) => selectCategory(3, e)}>Dinner</li>
                        <li className="sort-category" onClick={(e) => selectCategory(4, e)}>Dessert</li>
                        <li className="sort-category red-button" onClick={(e) => unselectCategory()}>Clear Filters</li>
                    </ul>
                </div>}
            </div>
        </div>
    )
}

export default SearchFilter;
