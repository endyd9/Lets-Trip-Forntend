import { configureStore, createSlice } from "@reduxjs/toolkit";

interface LoginValue {
  token: string;
  userId: number;
}

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: {
      isLoggedin: false,
      token: null,
      userId: null,
    },
  },
  reducers: {
    login: (state, token) => {
      state.value = {
        ...state.value,
        isLoggedin: true,
        token,
      };
    },
    userId: (state, userId) => {
      state.value = {
        ...state.value,
        userId,
      };
    },
    logout: (state) => {
      state.value = {
        isLoggedin: false,
        token: null,
        userId: null,
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
