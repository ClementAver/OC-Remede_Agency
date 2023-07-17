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

export function postOrUpdateLogin(username, password) {
  return async (dispatch, getState) => {
    const status = getState().signIn.status;
    if (status === "pending" || status === "updating") {
      return;
    }
    dispatch(postLogin());
    try {
      // const username = document.getElementById("username").value;
      // const password = document.getElementById("password").value;

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
      dispatch(loginResolved(data));
    } catch (error) {
      dispatch(loginRejected(error));
    }
  };
}

const { actions, reducer } = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    postLogin: (draft) => {
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
    loginResolved: (draft, action) => {
      if (draft.status === "pending" || draft.status === "updating") {
        draft.status = "resolved";
        draft.data.status = action.payload.status;
        draft.data.message = action.payload.message;
        if (action.payload.body) {
          draft.data.body = action.payload.body;
        }
        return;
      }
    },
    loginRejected: (draft, action) => {
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
    updateToken: (draft, token) => {
      draft.status = "resolved";
      draft.data.status = 200;
      draft.data.message = "User successfully logged in";
      if (token) {
        draft.data.body.token = token;
      }
      return;
    },

    resetLogin: (draft) => {
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

export const { postLogin, loginResolved, loginRejected, resetLogin, updateToken } = actions;
export { reducer as loginReducer };
