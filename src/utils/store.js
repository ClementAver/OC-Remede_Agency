import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./reducers/postUserLogin.reducer";
import { signupReducer } from "./reducers/postUserSignup.reducer";
import { profileReducer } from "./reducers/postUserProfile.reducer";
import { editProfileReducer } from "./reducers/putUserProfile.reducer";

export default configureStore({
  reducer: {
    signIn: loginReducer,
    signUp: signupReducer,
    profile: profileReducer,
    editProfile: editProfileReducer,
  },
});
