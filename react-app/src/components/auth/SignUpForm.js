import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { login, signUp } from "../../store/session";
import "./SignUpForm.css";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data.errors) {
        setErrors(data.errors);
      }
    } else setErrors(["Passwords do not match"]);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  const onDemo = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo@aa.io", "password"));
  };

  return (
    <div className={"signup-container"}>
      <div className={"signup-form"}>
        <form onSubmit={onSignUp}>
          <div>
            {errors.map((error) => (
              <div className={"signup-errors"}>{error}</div>
            ))}
          </div>
          <div>
            <p className={"signup-label"}>User Name</p>
            <input
              className={"signup-input"}
              type="text"
              name="username"
              onChange={updateUsername}
              value={username}
              required={true}
            ></input>
          </div>
          <div>
            <p className={"signup-label"}>Email</p>
            <input
              className={"signup-input"}
              type="email"
              name="email"
              onChange={updateEmail}
              value={email}
              required={true}
            ></input>
          </div>
          <div>
            <p className={"signup-label"}>Password</p>
            <input
              className={"signup-input"}
              type="password"
              name="password"
              onChange={updatePassword}
              value={password}
              required={true}
            ></input>
          </div>
          <div>
            <p className={"signup-label"}>Repeat Password</p>
            <input
              className={"signup-input"}
              type="password"
              name="repeat_password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <button className={"signup-submit"} type="submit">
            Sign Up
          </button>
        </form>
        <div className={"signup-line"}></div>
        <div className={"signup-login"}>
          <NavLink
            className={"signup-login__text"}
            to="/"
            exact={true}
            activeClassName="active"
          >
            Login
          </NavLink>
        </div>
        <form onSubmit={onDemo}>
          <button className={"splash-submit"} type="submit">
            Demo Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
