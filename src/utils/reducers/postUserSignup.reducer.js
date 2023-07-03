import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  status: "void",
  data: {
    status: null,
    message: null,
    body: null,
  },
  error: null,
};

export function postOrUpdateSignup(email, password, firstName, lastName) {
  return async (dispatch, getState) => {
    const status = getState().status;
    if (status === "pending" || status === "updating") {
      return;
    }
    dispatch(postSignup());
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
        }),
      });
      const data = await response.json();
      dispatch(signupResolved(data));
    } catch (error) {
      dispatch(signupRejected(error));
    }
  };
}

const { actions, reducer } = createSlice({
  name: "signup",
  initialState: initialState,
  reducers: {
    postSignup: (draft) => {
      if (draft.status === "void") {
        draft.status = "pending";
        return;
      }
      if (draft.status === "rejected") {
        draft.error = null;
        draft.status = "pending";
        return;
      }
      if (draft.status === "resolved") {
        draft.status = "updating";
        return;
      }
    },
    signupResolved: (draft, action) => {
      if (draft.status === "pending" || draft.status === "updating") {
        draft.data = action.payload;
        draft.status = "resolved";
        return;
      }
    },
    signupRejected: (draft, action) => {
      if (draft.status === "pending" || draft.status === "updating") {
        draft.status = "rejected";
        draft.error = action.payload;
        draft.data = null;
        return;
      }
    },
    resetSignup: (draft) => {
      if (draft.data !== initialState.data) {
        draft.status = "void";
        draft.data = {
          status: null,
          message: null,
          body: null,
        };
        draft.error = null;
        return;
      }
    },
  },
});

export const { postSignup, signupResolved, signupRejected, resetSignup } = actions;
export { reducer as signupReducer };
