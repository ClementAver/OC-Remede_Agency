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

export async function postOrUpdateHeader(dispatch, getState) {
  const status = getState().header.status;
  const token = getState().signIn.data.body.token;

  if (status === "pending" || status === "updating") {
    return;
  }
  dispatch(headerPost(token));

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
    .then((data) => dispatch(headerResolved(data)))
    .catch((error) => dispatch(headerRejected(error)));
}

const { actions, reducer } = createSlice({
  name: "header",
  initialState: initialState,
  reducers: {
    headerPost: (draft) => {
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
    headerResolved: (draft, action) => {
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
    headerRejected: (draft, action) => {
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
    headerReset: (draft) => {
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

export const { headerPost, headerResolved, headerRejected, headerReset } = actions;
export { reducer as headerReducer };
