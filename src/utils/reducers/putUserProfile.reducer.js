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

export async function putOrUpdateEditProfile(dispatch, getState) {
  const status = getState().signIn.status;
  const token = getState().signIn.data.body.token;

  if (status === "pending" || status === "updating") {
    return;
  }

  dispatch(putEditProfile());
  const firstName = document.getElementById("firstname").value;
  const lastName = document.getElementById("lastname").value;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  var raw = JSON.stringify({
    firstName: firstName,
    lastName: lastName,
  });

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
  };

  fetch("http://localhost:3001/api/v1/user/profile", requestOptions)
    .then((response) => response.json())
    .then((data) => dispatch(editProfileResolved(data)))
    .catch((error) => dispatch(editProfileRejected(error)));
}

const { actions, reducer } = createSlice({
  name: "editProfile",
  initialState: initialState,
  reducers: {
    putEditProfile: (draft) => {
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
    editProfileResolved: (draft, action) => {
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
    editProfileRejected: (draft, action) => {
      if (draft.status === "pending" || draft.status === "updating") {
        draft.status = "rejected";
        draft.error = action.payload;
        draft.data = {
          status: null,
          message: null,
          body: null,
        };
        return;
      }
    },
    resetEditProfile: (draft) => {
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

export const { putEditProfile, editProfileResolved, editProfileRejected, resetEditProfile } = actions;
export { reducer as editProfileReducer };
