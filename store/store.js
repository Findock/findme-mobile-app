import { configureStore } from '@reduxjs/toolkit';
import announcementSlice from 'store/announcement/announcementSlice';
import authSlice from 'store/auth/authSlice';
import filtersOptionsSlice from 'store/filters-options/filtersOptionsSlice';
import globalLoaderSlice from 'store/global-loader/globalLoaderSlice';
import meSlice from 'store/me/meSlice';
import multiSelectSlice from 'store/multi-select/multiSelectSlice';
import selectSlice from 'store/select/selectSlice';
import commentsSlice from 'store/comments/commentsSlice';

export default configureStore({
  reducer: {
    auth: authSlice,
    globalLoader: globalLoaderSlice,
    me: meSlice,
    multiSelect: multiSelectSlice,
    select: selectSlice,
    announcement: announcementSlice,
    filtersOptions: filtersOptionsSlice,
    comments: commentsSlice,
  },
});
