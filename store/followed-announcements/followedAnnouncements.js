import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  followedAnnouncementsAmount: 0,
});

export const followedAnnouncementsSlice = createSlice({
  name: 'followedAnnouncements',
  initialState: initialState(),
  reducers: {
    setFollowedAnnouncementsAmount: (state, action) => {
      state.followedAnnouncementsAmount = action.payload;
    },
  },
});

export const { setFollowedAnnouncementsAmount } = followedAnnouncementsSlice.actions;
export default followedAnnouncementsSlice.reducer;
