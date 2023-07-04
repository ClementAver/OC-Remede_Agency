import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  status: "void",
  data: {
    status: null,
    message: null,
    body: {
      email: null,
      firstName: null,
      lastName: null,
      createdAt: null,
      updatedAt: null,
      id: null,
    },
  },
  error: null,
};

export function postOrUpdateProfile(cookie) {
  return async (dispatch, getState) => {
    const status = getState().profile.status;
    let token = "";
    cookie ? (token = cookie) : (token = getState().signIn.data.body.token);

    if (status === "pending" || status === "updating") {
      return;
    }
    dispatch(postProfile(token));

    var myHeaders = new Headers();
    console.log(token);
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:3001/api/v1/user/profile", requestOptions)
      .then((response) => response.json())
      .then((data) => dispatch(profileResolved(data)))
      .catch((error) => dispatch(profileRejected(error)));
  };
}

const { actions, reducer } = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    postProfile: (draft) => {
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
    profileResolved: (draft, action) => {
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
    profileRejected: (draft, action) => {
      if (draft.status === "pending" || draft.status === "updating") {
        console.log(action.payload);
        draft.status = "rejected";
        draft.error = action.payload;
        draft.data = {
          status: null,
          message: null,
          body: {
            email: null,
            firstNAme: null,
            lastName: null,
            createdAt: null,
            updatedAt: null,
            id: null,
          },
        };
        return;
      }
    },
    resetProfile: (draft) => {
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

export const { postProfile, profileResolved, profileRejected, resetProfile } = actions;
export { reducer as profileReducer };
