import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {},
  userBalance: 0,
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      localStorage.setItem("token", action.payload);
      state.token = action.payload;
    },
    setDataUser: (state, action) => {
      state.userData = action.payload;
    },
    setDataBalance: (state, action) => {
      state.userBalance = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { setToken, setDataUser, setDataBalance } = authSlice.actions;

export default authSlice.reducer;
