import { configureStore } from "@reduxjs/toolkit";
import counterAuth from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: counterAuth,
  },
});
