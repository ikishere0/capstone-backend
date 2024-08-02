import { createSlice } from "@reduxjs/toolkit";

export const likedPhotosSlice = createSlice({
  name: "likedPhotos",
  initialState: [],
  reducers: {
    setLikedPhotos: (state, action) => {
      return action.payload;
    },
    addLikedPhoto: (state, action) => {
      state.push(action.payload);
    },
    removeLikedPhoto: (state, action) => {
      return state.filter((photo) => photo.id !== action.payload);
    },
  },
});

export const { setLikedPhotos, addLikedPhoto, removeLikedPhoto } =
  likedPhotosSlice.actions;

export default likedPhotosSlice.reducer;
