import { createSlice } from "@reduxjs/toolkit";
import {
  getUserAttendanceRecords,
  editAttendance,
  addAttendance,
  deleteAttendance,
  getAttendanceBetweenDates,
  getAttendanceCount,
  generateUserReport,
  generateAttendanceReport,
  manageLeaveRequests,
  getLeaveRequests,
  approveLeaveRequest,
  getAttendanceCounts,
} from "../api/adminApi";



const initialState = {
  loading: false,
  error: null,
  attendanceRecords: [],
  attendanceCount: 0,
  leaveRequests: [],
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAttendanceRecords(state, action) {
      state.attendanceRecords = action.payload;
    },
    setAttendanceCount(state, action) {
      state.attendanceCount = action.payload;
    },
    setLeaveRequests(state, action) {
      state.leaveRequests = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  setAttendanceRecords,
  setAttendanceCount,
  setLeaveRequests,
  setLoading,
  setError,
} = adminSlice.actions;

export const fetchUserAttendanceRecords = (userId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const attendanceRecords = await getUserAttendanceRecords(userId);
    dispatch(setAttendanceRecords(attendanceRecords));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateUserAttendance = (attendanceId, attendanceData) => async (
  dispatch
) => {
  try {
    dispatch(setLoading(true));
    await editAttendance(attendanceId, attendanceData);
    const updatedAttendanceRecords = await getUserAttendanceRecords(
      attendanceData.userId
    );
    dispatch(setAttendanceRecords(updatedAttendanceRecords));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const addNewAttendanceRecord = (attendanceData) => async (dispatch) => {
  console.log('attendnce api at slice', attendanceData)
  try {
    dispatch(setLoading(true));

    if (attendanceData.id) {
        // Update existing record
        await editAttendance(attendanceData.id, attendanceData);
    } else {
        // Add new record
        await addAttendance('/addAttendance', attendanceData);
    }

    const updatedAttendanceRecords = await getUserAttendanceRecords(
        attendanceData.userId
    );
    dispatch(setAttendanceRecords(updatedAttendanceRecords));
} catch (error) {
    dispatch(setError(error.message));
} finally {
    dispatch(setLoading(false));
}
};

export const removeAttendanceRecord = (attendanceId, userId) => async (
  dispatch
) => {
  try {
    dispatch(setLoading(true));
    await deleteAttendance(attendanceId);
    const updatedAttendanceRecords = await getUserAttendanceRecords(userId);
    dispatch(setAttendanceRecords(updatedAttendanceRecords));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchAttendanceCount = (userId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const attendanceCount = await getAttendanceCount(userId);
    dispatch(setAttendanceCount(attendanceCount));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchLeaveRequests = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const leaveRequests = await getLeaveRequests();
    dispatch(setLeaveRequests(leaveRequests));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const approveLeaveRequestAction = (leaveRequestId) => async (
  dispatch
) => {
  try {
    dispatch(setLoading(true));
    await approveLeaveRequest(leaveRequestId);
    const updatedLeaveRequests = await getLeaveRequests();
    dispatch(setLeaveRequests(updatedLeaveRequests));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchAttendanceBetweenDates = (dates) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const attendanceData = await getAttendanceBetweenDates(dates);
    dispatch(setAttendanceRecords(attendanceData)); 
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const generateUserReportAction = (fromDate, toDate) => async (
  dispatch
) => {
  try {
    dispatch(setLoading(true));
    const reportData = await generateUserReport(fromDate, toDate);
    dispatch(setUserReport(reportData));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const generateAttendanceReportAction = (fromDate, toDate) => async (
  dispatch
) => {
  try {
    dispatch(setLoading(true));
    const reportData = await generateAttendanceReport(fromDate, toDate);
    dispatch(setAttendanceReport(reportData));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const manageLeaveRequestsAction = (requestData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await manageLeaveRequests(requestData);
    console.log("Manage leave requests response:", response);
    dispatch(handleLeaveRequests(response));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchAttendanceCounts = (userId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const counts = await getAttendanceCounts(userId);
    console.log("Fetched attendance counts:", counts);
    dispatch(setAttendanceCounts(counts));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default adminSlice.reducer;
