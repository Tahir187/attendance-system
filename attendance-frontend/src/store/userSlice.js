import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  markPresent,
  submitLeaveRequest,
  updateUserProfile,
  viewAttendance,
} from "../api/userApi";
import { uploadProfile } from "../api/profileApi";

const initialState = {
  loading: false,
  error: null,
};

export const markPresentAsync = createAsyncThunk(
  "user/markPresent",
  async (userData, { rejectWithValue }) => {
    try {
      await markPresent(userData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const submitLeaveRequestAsync = createAsyncThunk(
  "user/submitLeaveRequest",
  async (userData, { rejectWithValue }) => {
    try {
      await submitLeaveRequest(userData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserProfileAsync = createAsyncThunk(
  "user/updateUserProfile",
  async (userData, { rejectWithValue }) => {
    try {
      await updateUserProfile(userData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const viewAttendanceAsync = createAsyncThunk(
  "user/viewAttendance",
  async (userData, { rejectWithValue }) => {
    try {
      await viewAttendance(userData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const uploadProfileAsync = createAsyncThunk(
  "user/uploadProfile",
  async (formData, { rejectWithValue }) => {
    try {
      await uploadProfile(formData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(markPresentAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markPresentAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(submitLeaveRequestAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitLeaveRequestAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfileAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfileAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(viewAttendanceAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(viewAttendanceAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(uploadProfileAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadProfileAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(uploadProfileAsync.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
