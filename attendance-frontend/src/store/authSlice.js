import { createSlice } from "@reduxjs/toolkit";
import { login, register } from "../api/authApi";
import { getUsers } from "../api/getUsersApi";

const initialState = {
  user: null,
  users: [],
  isLoggedIn: false,
  role: [],
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.role = action.payload.role; 
    },
    logoutUser(state) {
      state.user = null;
      state.isLoggedIn = false;
      state.role = null;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
  },
});

export const { setUser, logoutUser, setError, setLoading, setUsers } = authSlice.actions;

export const loginUser = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await login(userData);
    dispatch(setUser(response.user));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await register(userData);
    dispatch(setUser(response.user));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchUsers = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await getUsers();
    dispatch(setUsers(response.users));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default authSlice.reducer;

