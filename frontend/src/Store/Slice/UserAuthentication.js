import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../constants/constant";

const STATUSES = {
  LOADING: "loading",
  ERROR: "error",
  SUCCESS: "success",
  IDLE: "idle",
};

export const userAuthentictionSlice = createSlice({
  name: "createBlog",
  initialState: {
    status: STATUSES.IDLE,
    data: {},
    isAuthenticated: false,
  },
  extraReducers: (bundler) => {
    bundler
      .addCase(registerUser.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        if (action.payload.message) {
          state.status = STATUSES.ERROR;
          state.isAuthenticated = false;
        } else {
          state.status = STATUSES.SUCCESS;
          state.isAuthenticated = true;
        }
        state.data = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.isAuthenticated = false;
        state.data = {};
      })
      .addCase(loginUser.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload.message) {
          state.status = STATUSES.ERROR;
          state.isAuthenticated = false;
        } else {
          state.status = STATUSES.SUCCESS;
          state.isAuthenticated = true;
        }
        state.data = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.isAuthenticated = false;
        state.data = {};
      })
      .addCase(fetchUserProfile.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        if (action.payload.message) {
          state.status = STATUSES.ERROR;
          state.isAuthenticated = false;
        } else {
          state.status = STATUSES.SUCCESS;
          state.isAuthenticated = true;
        }
        state.data = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.isAuthenticated = false;
        state.data = {};
      })
      .addCase(UpdateProfilePicture.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(UpdateProfilePicture.fulfilled, (state, action) => {
        if (action.payload.message) {
          state.status = STATUSES.ERROR;
          state.isAuthenticated = false;
        } else {
          state.status = STATUSES.SUCCESS;
          state.isAuthenticated = true;
        }
        state.data = action.payload;
      })
      .addCase(UpdateProfilePicture.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.isAuthenticated = false;
        state.data = action.payload;
      })
      .addCase(logout.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = STATUSES.SUCCESS;
        state.isAuthenticated = false;
        state.data = {};
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(updatePassword.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        if (action.payload.message) {
          state.status = STATUSES.ERROR;
          state.isAuthenticated = false;
        } else {
          state.status = STATUSES.SUCCESS;
          state.isAuthenticated = true;
        }
        state.data = action.payload;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.isAuthenticated = false;
        state.data = action.payload;
      })
      .addCase(forgotPassword.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(resetPassword.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.status = STATUSES.SUCCESS;
      })
      .addCase(addComment.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.SUCCESS;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const registerUser = createAsyncThunk(
  "registerUser",
  async ({ name, email, password }) => {
    try {
      const { data } = await axios.post(
        `${URL}/register`,
        {
          name,
          email,
          password,
        },
        { withCredentials: true }
      );

      return data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }
);
export const loginUser = createAsyncThunk(
  "loginUser",
  async ({ password, email }) => {
    try {
      const { data } = await axios.post(
        `${URL}/login`,
        { email, password },
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      return error.response.data;
    }
  }
);
export const fetchUserProfile = createAsyncThunk(
  "fetchUserProfile",
  async () => {
    const { data } = await axios.get(`${URL}/me`, { withCredentials: true });
    return data;
  }
);
export const UpdateProfilePicture = createAsyncThunk(
  "UpdateProfilePicture",
  async (formData) => {
    try {
      const { data } = await axios.post(`${URL}/upload/profilePic`, formData, {
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
export const completeProfile = createAsyncThunk(
  "completeProfile",
  async ({ bio, profession, name, contactInfo }) => {
    try {
      const { data } = await axios.put(
        `${URL}/completeProfile`,
        {
          bio,
          profession,
          name,
          contactInfo,
        },
        { withCredentials: true }
      );

      return data;
    } catch (error) {
      return error.response.data;
    }
  }
);
export const logout = createAsyncThunk("logout", async () => {
  const data = await axios.get(`${URL}/logout`, { withCredentials: true });
  return data;
});

export const updatePassword = createAsyncThunk(
  "updatePassword",
  async ({ newPassword, oldPassword }) => {
    try {
      const { data } = await axios.patch(
        `${URL}/updatePassword`,
        {
          newPassword,
          oldPassword,
        },
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      return error.response.data;
    }
  }
);
export const forgotPassword = createAsyncThunk(
  "forgotPassword",
  async (email) => {
    const { data } = await axios.post(
      `${URL}/forgotPassword`,
      { email },
      { withCredentials: true }
    );
    return data;
  }
);
export const resetPassword = createAsyncThunk(
  "resetPassword",
  async ({ token, password }) => {
    // console.log(token, password);
    const { data } = await axios.put(
      `${URL}/resetPassword/${token}`,
      {
        password,
      },
      { withCredentials: true }
    );
    return data;
  }
);
export const increaseLike = createAsyncThunk("increaseLike", async (id) => {
  const { data } = await axios.post(
    `https://blog-website-production-0e09.up.railway.app/api/v1/blogs/like/${id}`,
    {
      withCredentials: true,
    }
  );
  return data;
});
export const decreaseLike = createAsyncThunk("decreaseLike", async (id) => {
  const { data } = await axios.post(
    `https://blog-website-production-0e09.up.railway.app/api/v1/blogs/unlike/${id}`,
    {
      withCredentials: true,
    }
  );
  // console.log(data);
  return data;
});
export const addComment = createAsyncThunk(
  "addComment",
  async ({ comment, id }) => {
    const { data } = await axios.post(
      `${URL}/addcomment/${id}`,
      { comment },
      { withCredentials: true }
    );
    return data;
  }
);
export default userAuthentictionSlice.reducer;
