import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const STATUSES = {
  LOADING: "loading",
  ERROR: "error",
  SUCCESS: "success",
  IDLE: "idle",
};

// const baseURL = "https://blog-website-production-0e09.up.railway.app/api/v1";
// const baseURL = "http://localhost:8080/api/v1"; // Adjusted for local development
const baseURL = "https://blog-api-puce-eta.vercel.app/api/v1"
export const blogsSlice = createSlice({
  name: "blogs",
  initialState: {
    status: STATUSES.IDLE,
    data: [],
  },
  extraReducers: (bundler) => {
    bundler
      .addCase(fetchBlogs.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        if (action.payload?.message) {
          state.status = STATUSES.ERROR;
        } else {
          state.status = STATUSES.SUCCESS;
        }
        state.data = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const fetchBlogs = createAsyncThunk("fetchBlogs", async (page) => {
  try {
    if (page <= 0 || !page) page = 1;
    const { data } = await axios.get(
      `${baseURL}/blogs?page=${page}`,
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
});

export default blogsSlice.reducer;
