import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import RecipeList from "./components/RecipeList";
import RecipeCreate from "./components/RecipeCreate";
import RecipeEdit from "./components/RecipeEdit";
import Navigation from "./components/Navigation";
import RecipePage from "./components/RecipePage";
import { authenticate } from "./store/session";

function App() {
  // const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await dispatch(authenticate());
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/recipes" exact={true}>
          <RecipeList />
        </ProtectedRoute>
        <Navigation />
      </Switch>
      <Switch>
        <ProtectedRoute path="/recipes/create" exact={true}>
          <RecipeCreate />
        </ProtectedRoute>
        <ProtectedRoute path="/recipes/:id" exact={true}>
          <RecipePage />
        </ProtectedRoute>
        <ProtectedRoute path="/recipes/:id/edit" exact={true}>
          <RecipeEdit />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
