import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  status: "void",
  data: {
    status: null,
    message: null,
    body: {
      token: null,
    },
  },
  error: null,
};

export async function postOrUpdateSignIn(dispatch, getState) {
  const status = getState().status;
  if (status === "pending" || status === "updating") {
    return;
  }
  dispatch(signInPost());
  try {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const response = await fetch("http://localhost:3001/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: username,
        password: password,
      }),
    });
    const data = await response.json();
    dispatch(signInResolved(data));
  } catch (error) {
    dispatch(signInRejected(error));
  }
}

const { actions, reducer } = createSlice({
  name: "signIn",
  initialState: initialState,
  prepare: (id, password) => ({
    payload: {
      email: id,
      password: password,
    },
  }),
  reducers: {
    signInPost: (draft) => {
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
    signInResolved: (draft, action) => {
      if (draft.status === "pending" || draft.status === "updating") {
        draft.data = action.payload;
        draft.status = "resolved";
        return;
      }
    },
    signInRejected: (draft, action) => {
      if (draft.status === "pending" || draft.status === "updating") {
        draft.status = "rejected";
        draft.error = action.payload;
        draft.data = {
          status: null,
          message: null,
          body: {
            token: null,
          },
        };
        return;
      }
    },
    signInReset: (draft) => {
      if (draft.data !== initialState.data) {
        draft.status = "void";
        draft.data = {
          status: null,
          message: null,
          body: {
            token: null,
          },
        };
        draft.error = null;
        return;
      }
    },
  },
});

export const { signInPost, signInResolved, signInRejected, signInReset } = actions;
export { reducer as signInReducer };
