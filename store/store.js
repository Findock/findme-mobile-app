import { configureStore } from '@reduxjs/toolkit';
import authSlice from 'store/auth/authSlice';
import globalLoaderSlice from 'store/global-loader/globalLoaderSlice';
import meSlice from 'store/me/meSlice';
import multiSelectSlice from 'store/multi-select/multiSelectSlice';

export default configureStore({
  reducer: {
    auth: authSlice,
    globalLoader: globalLoaderSlice,
    me: meSlice,
    selectedOptions: multiSelectSlice,
  },
});
