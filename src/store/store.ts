import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../store/movie/movieSlice';
import authReducer from '../store/auth/authSlice';

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
