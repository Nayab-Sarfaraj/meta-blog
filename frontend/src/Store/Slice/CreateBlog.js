import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const STATUSES = {
  LOADING: "loading",
  ERROR: "error",
  SUCCESS: "success",
  IDLE: "idle",
};

export const createBlogSlice = createSlice({
  name: "createBlog",
  initialState: {
    status: STATUSES.IDLE,
    data: {},
  },
  extraReducers: (bundler) => {
    bundler
      .addCase(createBlog.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        if (action.payload.message) {
          state.status = STATUSES.ERROR;
        } else {
          state.status = STATUSES.SUCCESS;
        }
        state.data = action.payload;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const createBlog = createAsyncThunk("createBlog", async (formData) => {
  try {
    const { data } = await axios.post("/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    return error.response.data;
  }
});

export default createBlogSlice.reducer;
