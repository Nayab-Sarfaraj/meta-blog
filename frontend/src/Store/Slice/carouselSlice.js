import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../constants/constant";

const STATUSES = {
  LOADING: "loading",
  ERROR: "error",
  SUCCESS: "success",
  IDLE: "idle",
};

export const carouselSlice = createSlice({
  name: "createBlog",
  initialState: {
    status: STATUSES.IDLE,
    data: {},
  },
  extraReducers: (bundler) => {
    bundler
      .addCase(getCarousel.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(getCarousel.fulfilled, (state, action) => {
        if (action.payload.message) {
          state.status = STATUSES.ERROR;
        } else {
          state.status = STATUSES.SUCCESS;
        }
        state.data = action.payload;
      })
      .addCase(getCarousel.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const getCarousel = createAsyncThunk("getCarousel", async () => {
  const { data } = await axios.get(`${URL}/carousel`, {
    withCredentials: true,
  });

  return data;
});

export default carouselSlice.reducer;
