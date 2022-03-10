import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  me: {},
});

export const meSlice = createSlice({
  name: 'me',
  initialState: initialState(),
  reducers: {
    setMe: (state, action) => {
      state.me = { ...action.payload };
    },
  },
});

export const { setMe } = meSlice.actions;
export default meSlice.reducer;
