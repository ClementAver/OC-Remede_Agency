import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button/Button";
import { postOrUpdateSignup } from "../../utils/reducers/postUserSignup.reducer";

export default function SignUp() {
  const dispatch = useDispatch();

  const message = useSelector((state) => state.signUp.data.message);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const emailInput = useRef();
  const passwordInput = useRef();
  const firstNameInput = useRef();
  const lastNameInput = useRef();

  const handleEmail = () => {
    setEmail(emailInput.current.value);
  };

  const handlePassword = () => {
    setPassword(passwordInput.current.value);
  };

  const handleFirstName = () => {
    setFirstName(firstNameInput.current.value);
  };

  const handleLastName = () => {
    setLastName(lastNameInput.current.value);
  };

  if (message === "User successfully created") {
    alert(message);
    return (
      <Navigate
        to="/login"
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
                ref={emailInput}
                onChange={handleEmail}
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
            <div className="input-wrapper">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                ref={firstNameInput}
                onChange={handleFirstName}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                ref={lastNameInput}
                onChange={handleLastName}
              />
            </div>
            <Button
              onClick={(e) => {
                e.preventDefault();
                dispatch(postOrUpdateSignup(email, password, firstName, lastName));
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
