// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice';
import adminReducer from './adminSlice';
import {thunk} from 'redux-thunk';

const middleware = (getDefaultMiddleware) => [...getDefaultMiddleware(), thunk]; // Include Redux Thunk middleware

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    admin: adminReducer,
  },
  middleware, // Add middleware to the store configuration
});
