import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  user: null,
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccount: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    clearAccount: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { setAccount, clearAccount } = accountSlice.actions;

export default accountSlice.reducer;
