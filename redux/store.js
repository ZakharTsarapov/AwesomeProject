import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { sliceAuth } from "./auth/sliceAuth";

const rootReducer = combineReducers({
  [sliceAuth.name]: sliceAuth.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
