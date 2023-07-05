import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import { postOrUpdateProfile, resetProfile } from "../../utils/reducers/postUserProfile.reducer";
import { resetLogin } from "../../utils/reducers/postUserLogin.reducer";
import { resetEditProfile } from "../../utils/reducers/putUserProfile.reducer";
import { resetSignup } from "../../utils/reducers/postUserSignup.reducer";

export default function Header() {
  const dispatch = useDispatch();

  const loginMessage = useSelector((state) => state.signIn.data.message);
  const profileMessage = useSelector((state) => state.profile.data.message);
  const name = useSelector((state) => state.profile.data.body.firstName);

  useEffect(() => {
    if (loginMessage === "User successfully logged in") {
      dispatch(postOrUpdateProfile());
    }
  }, [loginMessage, dispatch]);

  let sign = null;

  if (profileMessage === "Successfully got user profile data") {
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
          to="/"
          className="main-nav-item"
          onClick={() => {
            document.cookie = `token=""; path =/; max-age=0; secure; samesite=lax`;
            dispatch(resetLogin());
            dispatch(resetProfile());
            dispatch(resetEditProfile());
            dispatch(resetSignup());
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
        to="/login"
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
