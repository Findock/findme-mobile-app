import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  isAuth: false,
  token: null,
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState(),
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      if (state.token) state.isAuth = true;
      else state.isAuth = false;
    },
    removeToken: (state) => {
      state.token = null;
      state.isAuth = false;
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;
export default authSlice.reducer;
