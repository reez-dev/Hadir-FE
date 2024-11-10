import { DashboardModel } from "@/app/dashboard/model/dashboard_model";
import { endpoint } from "@/config/endpoint";
import RsAPI from "@/core/services/rs_api";
import RequestState from "@/core/types/request_state";
import { ResType } from "@/core/types/response_type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = <
  { status: RequestState; data: DashboardModel; error: string }
>{
  status: RequestState.IDLE,
  data: {},
  error: "",
};

export const fetchDashboard = createAsyncThunk(
  "dashboard/fetchDashboard",
  async () => {
    return RsAPI<ResType>()
      .get({
        url: endpoint.dashboard,
      })
      .then((res) => res.content);
  }
);

export const DashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    resetState: (state) => {
      state.data = {};
      state.error = "";
      state.status = RequestState.IDLE;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.status = RequestState.LOADING;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.status = RequestState.SUCCESS;
        state.data = action.payload;
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.status = RequestState.ERROR;
        state.error = action.error.message || "";
      });
  },
});

export default DashboardSlice.reducer;
