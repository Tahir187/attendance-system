import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { editAttendance, addAttendance, deleteAttendance, getAttendanceBetweenDates, getAttendanceCount, generateUserReport, generateAttendanceReport, manageLeaveRequests, approveLeaveRequest, getAttendanceCounts } from '../api/adminApi';
import { uploadProfile } from '../api/profileApi';

const initialState = {
  loading: false,
  error: null,
};


export const editAttendanceAsync = createAsyncThunk('admin/editAttendance', async (attendanceData, { rejectWithValue }) => {
  try {
    await editAttendance(attendanceData);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const addAttendanceAsync = createAsyncThunk('admin/addAttendance', async (attendanceData, { rejectWithValue }) => {
  try {
    await addAttendance(attendanceData);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteAttendanceAsync = createAsyncThunk('admin/deleteAttendance', async (attendanceId, { rejectWithValue }) => {
  try {
    await deleteAttendance(attendanceId);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getAttendanceBetweenDatesAsync = createAsyncThunk('admin/getAttendanceBetweenDates', async (dates, { rejectWithValue }) => {
  try {
    const response = await getAttendanceBetweenDates(dates);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getAttendanceCountAsync = createAsyncThunk('admin/getAttendanceCount', async (userId, { rejectWithValue }) => {
  try {
    const response = await getAttendanceCount(userId);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const generateUserReportAsync = createAsyncThunk('admin/generateUserReport', async (dates, { rejectWithValue }) => {
  try {
    const response = await generateUserReport(dates);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const generateAttendanceReportAsync = createAsyncThunk('admin/generateAttendanceReport', async (dates, { rejectWithValue }) => {
  try {
    const response = await generateAttendanceReport(dates);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const manageLeaveRequestsAsync = createAsyncThunk('admin/manageLeaveRequests', async (requestData, { rejectWithValue }) => {
  try {
    const response = await manageLeaveRequests(requestData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const approveLeaveRequestAsync = createAsyncThunk('admin/approveLeaveRequest', async (requestId, { rejectWithValue }) => {
  try {
    const response = await approveLeaveRequest(requestId);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getAttendanceCountsAsync = createAsyncThunk('admin/getAttendanceCounts', async (dates, { rejectWithValue }) => {
  try {
    const response = await getAttendanceCounts(dates);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const uploadProfileAsync = createAsyncThunk('admin/uploadProfile', async (formData, { rejectWithValue }) => {
  try {
    await uploadProfile(formData);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});


const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          action.type.endsWith('pending') ||
          action.type.endsWith('fulfilled') ||
          action.type.endsWith('rejected'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addMatcher(
        (action) =>
          action.type.endsWith('fulfilled') && action.payload !== undefined,
        (state) => {
          state.loading = false;
        }
      );
  },
});

export default adminSlice.reducer;
