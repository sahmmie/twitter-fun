import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import tweetsReducer from './tweetsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tweets: tweetsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

