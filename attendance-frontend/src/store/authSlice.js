import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, register } from '../api/authApi';

const initialState = {
  user: null,
  isLoggedIn: false,
  role: [],
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk('auth/loginUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await login(userData);
    return response.user;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const registerUser = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await register(userData);
    return response.user;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser(state) {
      state.user = null;
      state.isLoggedIn = false;
      state.role = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
        state.role = action.payload.role; // Assuming role is included in the login response
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
        state.role = action.payload.role; // Assuming role is included in the register response
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
