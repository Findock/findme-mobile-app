import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  comments: [],
});

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialState(),
  reducers: {
    setComments: (state, action) => {
      state.comments = [...action.payload];
    },
  },
});

export const { setComments } = commentsSlice.actions;
export default commentsSlice.reducer;
