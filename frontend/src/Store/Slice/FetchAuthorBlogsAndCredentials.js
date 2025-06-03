import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const STATUSES = {
  LOADING: "loading",
  ERROR: "error",
  SUCCESS: "success",
  IDLE: "idle",
};

export const authorCredentialsSlice = createSlice({
  name: "fetchAuthorBlogAndCredentials",
  initialState: {
    status: STATUSES.IDLE,
    data: {},
  },
  extraReducers: (bundler) => {
    bundler
      .addCase(fetchAuthorBlogAndCredentials.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchAuthorBlogAndCredentials.fulfilled, (state, action) => {
        if (action.payload.message) {
          state.status = STATUSES.ERROR;
        } else {
          state.status = STATUSES.SUCCESS;
        }
        state.data = action.payload;
      })
      .addCase(fetchAuthorBlogAndCredentials.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const fetchAuthorBlogAndCredentials = createAsyncThunk(
  "fetchAuthorBlogAndCredentials",
  async (id) => {
    const { data } = await axios.get(`/author/${id}`);

    return data;
  }
);

export default authorCredentialsSlice.reducer;
