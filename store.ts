import { configureStore, createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: {
      isLoggedin: false,
      token: null,
    },
  },
  reducers: {
    login: (state, token) => {
      state.value = {
        isLoggedin: true,
        token,
      };
    },
    logout: (state) => {
      state.value = {
        isLoggedin: false,
        token: null,
      };
    },
  },
});

export const nomemSlice = createSlice({
  name: "nomem",
  initialState: {
    value: {
      nickName: "",
      password: "",
    },
  },
  reducers: {
    save: (state, { nickName, password }: any) => {
      state.value = {
        nickName,
        password,
      };
    },
  },
});

export const store = configureStore({
  reducer: {
    users: userSlice.reducer,
  },
});
