import { configureStore } from '@reduxjs/toolkit';
import authSlice from 'store/auth/authSlice';

export default configureStore({
  reducer: {
    auth: authSlice,
  },
});
