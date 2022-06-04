import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  comments: [],
  commentToUpdate: null,
});

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialState(),
  reducers: {
    setComments: (state, action) => {
      state.comments = [...action.payload];
    },
    setCommentToUpdate: (state, action) => {
      state.commentToUpdate = action.payload;
    },
  },
});

export const {
  setComments,
  setCommentToUpdate,
} = commentsSlice.actions;
export default commentsSlice.reducer;
