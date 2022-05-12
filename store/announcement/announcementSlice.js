import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  updatedAnnouncement: null,
});

export const announcementSlice = createSlice({
  name: 'announcement',
  initialState: initialState(),
  reducers: {
    setUpdatedAnnouncement: (state, action) => {
      state.updatedAnnouncement = action.payload;
    },
  },
});

export const { setUpdatedAnnouncement } = announcementSlice.actions;
export default announcementSlice.reducer;
