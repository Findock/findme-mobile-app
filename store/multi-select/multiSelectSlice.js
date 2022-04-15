import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  selectedOptions: [],
  options: [],
  searchQuery: '',
});

export const multiSelectSlice = createSlice({
  name: 'multiSelect',
  initialState: initialState(),
  reducers: {
    setSelectedOptions: (state, action) => {
      state.selectedOptions = [...action.payload];
    },
    setOptions: (state, action) => {
      state.options = [...action.payload];
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setSelectedOptions, setOptions, setSearchQuery } = multiSelectSlice.actions;
export default multiSelectSlice.reducer;
