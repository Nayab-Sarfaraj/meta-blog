import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../constants/constant";

const STATUSES = {
  LOADING: "loading",
  ERROR: "error",
  SUCCESS: "success",
  IDLE: "idle",
};

export const singleBlogSlice = createSlice({
  name: "fetchBlog",
  initialState: {
    status: STATUSES.IDLE,
    data: {},
  },
  extraReducers: (bundler) => {
    bundler
      .addCase(fetchBlog.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchBlog.fulfilled, (state, action) => {
        if (action.payload.message) {
          state.status = STATUSES.ERROR;
        } else {
          state.status = STATUSES.SUCCESS;
        }
        state.data = action.payload;
      })
      .addCase(fetchBlog.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(deleteBlog.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        if (action.payload.message) {
          state.status = STATUSES.ERROR;
        } else {
          state.status = STATUSES.SUCCESS;
        }
        state.data = action.payload;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(editBlog.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(editBlog.fulfilled, (state, action) => {
        if (action.payload.message) {
          state.status = STATUSES.ERROR;
        } else {
          state.status = STATUSES.SUCCESS;
        }
        state.data = action.payload;
      })
      .addCase(editBlog.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const fetchBlog = createAsyncThunk("fetchBlog", async (id) => {
  const { data } = await axios.get(`${URL}/blog/${id}`);

  return data;
});
export const deleteBlog = createAsyncThunk("deleteBlog", async (id) => {
  const { data } = await axios.delete(
    `https://blog-website-production-0e09.up.railway.app/api/v1/blog/${id}`
  );

  return data;
});
export const editBlog = createAsyncThunk(
  "editBlog",
  async ({ id, formData }) => {
    try {
      const { data } = await axios.put(`${URL}/blog/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default singleBlogSlice.reducer;
