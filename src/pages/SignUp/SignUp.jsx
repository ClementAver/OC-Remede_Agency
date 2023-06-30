import Button from "../../components/Button/Button";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { postOrUpdateSignUp } from "./signup.reducer";
import { Link, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

export default function SignUp() {
  const dispatch = useDispatch();

  const message = useSelector((state) => state.signUp.data.message);

  if (message === "User successfully created") {
    alert(message);
    return (
      <Navigate
        to="/sign-in"
        replace={true}
      />
    );
  } else {
    return (
      <main className="main bg-dark">
        <section className="sign-in-content">
          <FontAwesomeIcon icon={faCircleUser} />
          <h1>Sign Up</h1>
          <form>
            <div className="input-wrapper">
              <label htmlFor="username">Email</label>
              <input
                type="text"
                name="email"
                id="email"
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
            <div className="input-wrapper">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                name="firstname"
                id="firstname"
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                name="lastname"
                id="lastname"
              />
            </div>
            <Button
              onClick={(e) => {
                e.preventDefault();
                dispatch(postOrUpdateSignUp);
              }}
              className="sign-in-button"
              text="Sign Up"
            />
          </form>
          <Link
            className="sign-in-link"
            to="/sign-in"
          >
            Sign in
          </Link>
        </section>
      </main>
    );
  }
}
