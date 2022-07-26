import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  unreadMessagesAmount: 0,
});

export const chatSlice = createSlice({
  name: 'chat',
  initialState: initialState(),
  reducers: {
    setUnreadMessagesAmount: (state, action) => {
      state.unreadMessagesAmount = action.payload;
    },
  },
});

export const { setUnreadMessagesAmount } = chatSlice.actions;
export default chatSlice.reducer;
