import { configureStore } from "@reduxjs/toolkit";
import { signInReducer } from "../pages/SignIn/signIn.reducer";
import { signUpReducer } from "../pages/SignUp/signup.reducer";
import { headerReducer } from "../components/Header/header.reducer";

export default configureStore({
  reducer: {
    signIn: signInReducer,
    signUp: signUpReducer,
    header: headerReducer,
  },
});
