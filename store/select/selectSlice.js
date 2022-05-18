import { createSlice } from '@reduxjs/toolkit';

const inititalState = () => ({
  selectInputs: [],
});

export const selectSlice = createSlice({
  name: 'select',
  initialState: inititalState(),
  reducers: {
    setSelectInput: (state, action) => {
      const { id, selectedOption } = action.payload;
      const existingInput = state.selectInputs.find((input) => input.id === id);
      if (existingInput) {
        state.selectInputs[state.selectInputs.indexOf(existingInput)] = {
          id: existingInput.id,
          selectedOption,
        };
      } else {
        state.selectInputs = [
          ...state.selectInputs, {
            id,
            selectedOption,
          },
        ];
      }
    },
  },
});

export const { setSelectInput } = selectSlice.actions;
export default selectSlice.reducer;
