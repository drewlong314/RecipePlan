import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { login } from "../../store/session";
import "./LoginForm.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (!data.errors) {
      setErrors(data.errors);
    }
  };

  const onDemo = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo@aa.io", "password"));
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/recipes" />; // this might need a trailing slash for heroku
  }

  return (
    <div className={"splash-container"}>
      <div>
      <h1 className={"splash-header"}>Recipe Plan</h1>
        <form className={"splash-form"} onSubmit={onLogin}>
          <div>
            {errors.map((error) => (
              <div>{error}</div>
            ))}
          </div>
          <div>
            <p className={"splash-label"} htmlFor="email">
              Email
            </p>
            <input
              className={"splash-input"}
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            <p className={"splash-label"} htmlFor="password">
              Password
            </p>
            <input
              className={"splash-input"}
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
          </div>
          <button className={"splash-submit"} type="submit">
            Login
          </button>
        </form>
        <form onSubmit={onDemo}>
          <button className={"splash-submit"} type="submit">
            Demo Login
          </button>
        </form>
        <div className={"splash-line"}></div>
        <div className={"splash-signup"}>
          <NavLink
            className={"splash-signup__text"}
            to="/sign-up"
            exact={true}
            activeClassName="active"
          >
            Sign Up
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
