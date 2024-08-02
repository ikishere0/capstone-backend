import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import accountReducer from "./slices/accountSlice";
import likedPhotosReducer from "./slices/likedPhotosSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    account: accountReducer,
    likedPhotos: likedPhotosReducer,
  },
});

export default store;
