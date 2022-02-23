import { configureStore } from '@reduxjs/toolkit';
import authSlice from 'store/auth/authSlice';
import globalLoaderSlice from 'store/global-loader/globalLoaderSlice';

export default configureStore({
  reducer: {
    auth: authSlice,
    globalLoader: globalLoaderSlice,
  },
});
