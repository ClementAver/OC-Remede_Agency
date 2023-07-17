import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button/Button";
import { postOrUpdateLogin } from "../../utils/reducers/postUserLogin.reducer";

export default function SignIn() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.signIn.data.body.token);
  const status = useSelector((state) => state.signIn.data.status);
  const message = useSelector((state) => state.signIn.data.message);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const usernameInput = useRef();
  const passwordInput = useRef();
  const rememberInput = useRef();

  let invalidUser = <></>;
  let invalidPassword = <></>;

  const handleUsername = () => {
    setUsername(usernameInput.current.value);
  };

  const handlePassword = () => {
    setPassword(passwordInput.current.value);
  };

  const handleRemember = () => {
    // setRemember(rememberInput.current.checked);
  };

  if (token !== null) {
    if (remember) {
      document.cookie = `token=${token}; path =/; max-age= 86400; secure; samesite=lax`;
    }
    return (
      <Navigate
        to="/profile"
        replace={true}
      />
    );
  } else {
    if (status === 400) {
      switch (message) {
        case "Error: User not found!":
          invalidUser = <span className="invalid-field">Utilisateur non répertorié.</span>;
          break;
        case "Error: Password is invalid":
          invalidPassword = <span className="invalid-field">Mot de passe invalide.</span>;
          break;
        default:
          return;
      }

      return (
        <main className="main bg-dark">
          <section className="sign-in-content">
            <FontAwesomeIcon icon={faCircleUser} />
            <h1>Sign In</h1>
            <form>
              <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  ref={usernameInput}
                  onChange={handleUsername}
                />
                {invalidUser}
              </div>
              <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  ref={passwordInput}
                  onChange={handlePassword}
                />
                {invalidPassword}
              </div>
              <div className="input-remember">
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  ref={rememberInput}
                  onClick={handleRemember}
                />
                <label htmlFor="remember-me">Remember me</label>
              </div>
              <Button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(postOrUpdateLogin(username, password));
                }}
                className="sign-in-button"
                text="Sign In"
              />
            </form>
            <Link
              className="sign-in-link"
              to="/sign-up"
            >
              Sign up
            </Link>
          </section>
        </main>
      );
    }
    return (
      <main className="main bg-dark">
        <section className="sign-in-content">
          <FontAwesomeIcon icon={faCircleUser} />
          <h1>Sign In</h1>
          <form>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                ref={usernameInput}
                onChange={handleUsername}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                ref={passwordInput}
                onChange={handlePassword}
              />
            </div>
            <div className="input-remember">
              <input
                type="checkbox"
                name="remember-me"
                id="remember-me"
                ref={rememberInput}
                onClick={handleRemember}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <Button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                dispatch(postOrUpdateLogin(username, password));
              }}
              className="sign-in-button"
              text="Sign In"
            />
          </form>
          <Link
            className="sign-in-link"
            to="/sign-up"
          >
            Sign up
          </Link>
        </section>
      </main>
    );
  }
}
