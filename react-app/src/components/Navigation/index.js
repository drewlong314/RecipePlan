import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllIngredients } from "../../store/ingredients";
import { getAllMeasurements } from "../../store/measurements";
import { getAllRecipes } from "../../store/recipes";
import LogoutButton from ".././auth/LogoutButton";
import "./style.css";

const Navigation = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const recipes = useSelector((state) => state.recipeReducer.recipes);

  useEffect(() => {
    if (recipes === null) {
      dispatch(getAllRecipes());
      dispatch(getAllMeasurements());
      dispatch(getAllIngredients());
    }
  }, []);

  return (
    <nav className={"nav-container"}>
      <div className={"nav-left"}>
      <NavLink
        className={"nav-home"}
        to="/"
        exact={true}
        activeClassName="active"
      >
        Recipe Plan
      </NavLink>

      <input className={"nav-search"}></input>

      <NavLink
        className={"nav-recipes"}
        to="/recipes"
        exact={true}
        activeClassName="active"
      >
        Recipes
      </NavLink>
      </div>
      <div className={'nav-right'}>
        {user ? (
          <LogoutButton className={"nav-logout"} />
        ) : (
          <NavLink
            className={"nav-login"}
            to="/login"
            exact={true}
            activeClassName="active"
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
