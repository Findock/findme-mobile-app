import { createSlice } from '@reduxjs/toolkit';

const inititalState = () => ({
  selectedOption: {},
});

export const selectSlice = createSlice({
  name: 'select',
  initialState: inititalState(),
  reducers: {
    setSelectedOption: (state, action) => {
      state.selectedOption = { ...action.payload };
    },
  },
});

export const { setSelectedOption } = selectSlice.actions;
export default selectSlice.reducer;
