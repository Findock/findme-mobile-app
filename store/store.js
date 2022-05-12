import { configureStore } from '@reduxjs/toolkit';
import announcementSlice from 'store/announcement/announcementSlice';
import authSlice from 'store/auth/authSlice';
import globalLoaderSlice from 'store/global-loader/globalLoaderSlice';
import meSlice from 'store/me/meSlice';
import multiSelectSlice from 'store/multi-select/multiSelectSlice';
import selectSlice from 'store/select/selectSlice';

export default configureStore({
  reducer: {
    auth: authSlice,
    globalLoader: globalLoaderSlice,
    me: meSlice,
    multiSelect: multiSelectSlice,
    select: selectSlice,
    announcement: announcementSlice,
  },
});
