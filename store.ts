import { configureStore, createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: {
      isLogedIn: false,
      token: null,
    },
  },
  reducers: {
    login: (state, token) => {
      state.value = {
        isLogedIn: true,
        token,
      };
    },
    logout: (state) => {
      state.value = {
        isLogedIn: false,
        token: null,
      };
    },
  },
});

export const store = configureStore({
  reducer: {
    reducer: userSlice.reducer,
  },
});
