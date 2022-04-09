import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  selectedOptions: [],
});

export const multiSelectSlice = createSlice({
  name: 'selectedOptions',
  initialState: initialState(),
  reducers: {
    setSelectedOptions: (state, action) => {
      state.selectedOptions = [...action.payload];
    },
  },
});

export const { setSelectedOptions } = multiSelectSlice.actions;
export default multiSelectSlice.reducer;
