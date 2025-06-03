import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../constants/constant";

const STATUSES = {
  LOADING: "loading",
  ERROR: "error",
  SUCCESS: "success",
  IDLE: "idle",
};

export const myBlogSlice = createSlice({
  name: "fetchMyBlogs",
  initialState: {
    status: STATUSES.IDLE,
    data: {},
  },
  extraReducers: (bundler) => {
    bundler
      .addCase(fetchMyBlogs.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchMyBlogs.fulfilled, (state, action) => {
        if (action.payload.message) {
          state.status = STATUSES.ERROR;
        } else {
          state.status = STATUSES.SUCCESS;
        }
        state.data = action.payload;
      })
      .addCase(fetchMyBlogs.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const fetchMyBlogs = createAsyncThunk("fetchMyBlogs", async () => {
  const { data } = await axios.get(`${URL}/myBlogs`);

  return data;
});

export default myBlogSlice.reducer;
