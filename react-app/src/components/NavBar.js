import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllIngredients } from '../store/ingredients';
import { getAllMeasurements } from '../store/measurements';
import { getAllRecipes } from '../store/recipes';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  const dispatch = useDispatch()
  const recipes = useSelector((state) => state.recipeReducer.recipes);

  useEffect(() => {
    if (recipes === null) {
      dispatch(getAllRecipes());
      dispatch(getAllMeasurements())
      dispatch(getAllIngredients())
    }
  },[])

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/recipes" exact={true} activeClassName="active">
            Recipes
          </NavLink>
        </li>
        <li>
          <LogoutButton/>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
