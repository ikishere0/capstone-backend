import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import accountReducer from "./accountSlice";

const rootReducer = combineReducers({
  user: userReducer,
  account: accountReducer,
});

export default rootReducer;
