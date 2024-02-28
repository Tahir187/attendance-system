import { createSlice } from "@reduxjs/toolkit";
import { markPresent, submitLeaveRequest, updateUserProfile, viewAttendance } from "../api/userApi";
import { uploadProfile } from "../api/profileApi";

const initialState = {
  loading: false,
  error: null,
  attendanceRecords: [],
  leaveRequests: [],
  userProfile: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    markPresentStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    markPresentSuccess: (state, action) => {
      state.loading = false;
      state.userProfile.isPresent = action.payload.isPresent;
    },
    markPresentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    submitLeaveRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    submitLeaveRequestSuccess: (state, action) => {
      state.loading = false;
      state.leaveRequests.push(action.payload.leaveRequest);
    },
    submitLeaveRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserProfileStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateUserProfileSuccess: (state, action) => {
      state.loading = false;
      state.userProfile = action.payload;
    },
    updateUserProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    viewAttendanceStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    viewAttendanceSuccess: (state, action) => {
      state.loading = false;
      state.attendanceRecords = action.payload;
    },
    viewAttendanceFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    uploadProfileStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    uploadProfileSuccess: (state) => {
      state.loading = false;
    },
    uploadProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { 
  markPresentStart,
  markPresentSuccess,
  markPresentFailure,
  submitLeaveRequestStart,
  submitLeaveRequestSuccess,
  submitLeaveRequestFailure,
  updateUserProfileStart,
  updateUserProfileSuccess,
  updateUserProfileFailure,
  viewAttendanceStart,
  viewAttendanceSuccess,
  viewAttendanceFailure,
  uploadProfileStart,
  uploadProfileSuccess,
  uploadProfileFailure
} = userSlice.actions;

export const markPresentAction = (attendanceData) => async (dispatch) => {
  try {
    dispatch(markPresentStart());
    const response = await markPresent(attendanceData);
    dispatch(markPresentSuccess(response));
  } catch (error) {
    dispatch(markPresentFailure(error.message));
  }
};

export const submitLeaveRequestAction = (leaveRequestData) => async (dispatch) => {
  try {
    dispatch(submitLeaveRequestStart());
    const response = await submitLeaveRequest(leaveRequestData);
    dispatch(submitLeaveRequestSuccess(response));
  } catch (error) {
    dispatch(submitLeaveRequestFailure(error.message));
  }
};

export const updateUserProfileAction = (userData) => async (dispatch) => {
  try {
    dispatch(updateUserProfileStart());
    const response = await updateUserProfile(userData);
    dispatch(updateUserProfileSuccess(response));
  } catch (error) {
    dispatch(updateUserProfileFailure(error.message));
  }
};

export const viewAttendanceAction = (userId) => async (dispatch) => {
  try {
    dispatch(viewAttendanceStart());
    const response = await viewAttendance(userId);
    dispatch(viewAttendanceSuccess(response));
  } catch (error) {
    dispatch(viewAttendanceFailure(error.message));
  }
};

export const uploadProfileAction = (formData) => async (dispatch) => {
  try {
    dispatch(uploadProfileStart());
    await uploadProfile(formData);
    dispatch(uploadProfileSuccess());
  } catch (error) {
    dispatch(uploadProfileFailure(error.message));
  }
};

export default userSlice.reducer;
