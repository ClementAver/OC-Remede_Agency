import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signInReset } from "../../pages/SignIn/signIn.reducer";
import { useEffect } from "react";
import { postOrUpdateHeader } from "./header.reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const dispatch = useDispatch();

  const message = useSelector((state) => state.signIn.data.message);
  const name = useSelector((state) => state.header.data.body.firstName);

  useEffect(() => {
    if (message === "User successfully logged in") {
      dispatch(postOrUpdateHeader);
    }
  }, [message, dispatch]);

  let sign = null;

  if (message === "User successfully logged in") {
    sign = (
      <nav className="header-nav-layout">
        <Link
          className="main-nav-item"
          to="/profile"
        >
          <FontAwesomeIcon icon={faCircleUser} />
          &nbsp;{name}
        </Link>
        <Link
          className="main-nav-item"
          onClick={(e) => {
            e.preventDefault();
            document.cookie = `token=""; path =/; max-age=0; secure; samesite=lax`;
            dispatch(signInReset());
          }}
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
          &nbsp;Sign Out
        </Link>
      </nav>
    );
  } else {
    sign = (
      <Link
        className="main-nav-item"
        to="/sign-in"
      >
        <FontAwesomeIcon icon={faCircleUser} />
        &nbsp;Sign In
      </Link>
    );
  }

  return (
    <nav className="main-nav">
      <Link
        className="main-nav-logo"
        to="/"
      >
        <img
          className="main-nav-logo-image"
          src="./assets/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>{sign}</div>
    </nav>
  );
}
