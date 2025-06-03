import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../constants/constant";

const STATUSES = {
  LOADING: "loading",
  ERROR: "error",
  SUCCESS: "success",
  IDLE: "idle",
};

export const searchSlice = createSlice({
  name: "createBlog",
  initialState: {
    status: STATUSES.IDLE,
    data: {},
  },
  extraReducers: (bundler) => {
    bundler
      .addCase(searchBlogs.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(searchBlogs.fulfilled, (state, action) => {
        if (action.payload.message) {
          state.status = STATUSES.ERROR;
        } else {
          state.status = STATUSES.SUCCESS;
        }
        state.data = action.payload;
      })
      .addCase(searchBlogs.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const searchBlogs = createAsyncThunk(
  "searchBlogs",
  async (searchInput) => {
    const { data } = await axios.post(
      `${URL}/search?searchInput=${searchInput}`
    );

    return data;
  }
);

export default searchSlice.reducer;
