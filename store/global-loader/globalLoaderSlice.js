import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  isLoading: true,
});

export const globalLoaderSlice = createSlice({
  name: 'globalLoader',
  initialState: initialState(),
  reducers: {
    setGlobalLoader: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setGlobalLoader } = globalLoaderSlice.actions;
export default globalLoaderSlice.reducer;
