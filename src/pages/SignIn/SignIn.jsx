import Button from "../../components/Button/Button";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postOrUpdateSignIn } from "./signIn.reducer";
import { Link, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

export default function SignIn() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.signIn.data.body.token);

  const rememberInput = useRef();
  const [remember, setRemember] = useState(false);
  const handleRemember = () => {
    setRemember(rememberInput.current.checked);
  };

  if (token !== null) {
    if (remember) {
      document.cookie = `token=${token}; path =/; max-age= 86400; secure; samesite=lax`;
    }
    return (
      <Navigate
        to="/"
        replace={true}
      />
    );
  } else {
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
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="text"
                name="password"
                id="password"
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
              onClick={(e) => {
                e.preventDefault();
                dispatch(postOrUpdateSignIn);
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
