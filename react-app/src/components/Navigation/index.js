import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllIngredients } from "../../store/ingredients";
import { getAllMeasurements } from "../../store/measurements";
import { getAllRecipes } from "../../store/recipes";
import LogoutButton from ".././auth/LogoutButton";
import "./style.css";

const Navigation = ({ title, other }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const recipes = useSelector((state) => state.recipeReducer.recipes);

  useEffect(() => {
    if (recipes === null) {
      dispatch(getAllRecipes(user));
      dispatch(getAllMeasurements());
      dispatch(getAllIngredients());
    }
  }, []);

  return (
    <nav className={"nav-container"}>
      <div className={"nav-left"}>
        <NavLink
          className={"nav-login"}
          to="/recipes"
          exact={true}
          activeClassName="active"
        >
          Recipe Plan
        </NavLink>
      </div>
      <div className={"nav-title"}>{title}</div>
      <div className={"nav-right"}>
        {other === "add" ? (
          <NavLink className={"nav-login"} to={`/recipes/create`}>
            Create Recipe
          </NavLink>
        ) :
        <NavLink className={"nav-login"} to={`/recipes/`}>
          Recipes
        </NavLink>}
        <NavLink className={"nav-login"} to={`/recipes/plan`}>
          Meal Plan
        </NavLink>
        <NavLink className={"nav-login"} to={"/about"}>About</NavLink>
        {user ? (
          <LogoutButton className={"nav-logout"} />
        ) : (
          <NavLink
            className={"nav-login"}
            to="/"
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
