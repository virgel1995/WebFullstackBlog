import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  SignIn,
  SignUp,
  getUserDetails,
  setToken,
  updatePassword,
  updateUser,
} from "@/Config";

const initialState = {
  isLoggedIn: false,
  isAdmin: false,
  user: null,
  code: null,
  loading: true,
  error: null,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ name, password, gender, age }, {rejectWithValue}) => {
    try {
      const res = await SignUp(name, password, gender, age);
      return res.data;
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue({ error: error.response.data.message });
      } else {
        return rejectWithValue({ error: error.message });
      }
    }
  }
);

export const LoginUser = createAsyncThunk(
  "auth/login",
  async ({ name, password }, { dispatch, rejectWithValue }) => {
    try {
      const res = await SignIn(name, password);
      console.log(res.data);
      if ((res.data.status = 200)) {
        setToken(res.data.data.token);
        const user = await getUserDetails().then(async ({ data }) => {
          if (data.type === "admin") {
            dispatch(setAdmin(true));
          }
          dispatch(setUser(data));
        });
      }
      return res.data;
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue({ error: error.response.data.message });
      } else {
        return rejectWithValue({ error: error.message });
      }
    }
  }
);

export const UpdateUserDetails = createAsyncThunk(
  "auth/updateUser",
  async (data, { dispatch, rejectWithValue }) => {
    const { id, name, gender, age } = data;
    try {
      const res = await updateUser(id, name, gender, age);
      if (res.data.status = 200) {
        const user = await getUserDetails().then(async ({ data }) => {
          if (data.type === "admin") {
            dispatch(setAdmin(true));
          }
          dispatch(setUser(data));
        });
      }
      return res.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue({ error: error.response.data.message });
      } else {
        return rejectWithValue({ error: error.message });
      }
    }
  }
);
export const UpdateUserPassword = createAsyncThunk(
  "auth/updatePassword",
  async (data, { dispatch, rejectWithValue }) => {
    const { id, name, password, gender, age } = data;
    try {
      const res = await updatePassword(id, name, password, gender, age);
      if (res.data.status = 200) {
        const user = await getUserDetails().then(async ({ data }) => {
          if (data.type === "admin") {
            dispatch(setAdmin(true));
          }
          dispatch(setUser(data));
        });
      }
      return res.data;
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue({ error: error.response.data.message });
      } else {
        return rejectWithValue({ error: error.message });
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.token = action.payload;
    },
    setAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
    handleLogout: (state, action) => {
      state.isLoggedIn = false;
      state.isAdmin = false;
      state.user = null;
      state.loading = true;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.test = true;
      state.code = action.payload;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = true;
      state.error = action.error.message;
    });

    builder.addCase(LoginUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
    });
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.loading = true;
      state.error = action.error.message;
    });

    builder.addCase(UpdateUserDetails.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(UpdateUserDetails.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(UpdateUserDetails.rejected, (state, action) => {
      state.loading = true;
      state.error = action.error.message;
    });

    builder.addCase(UpdateUserPassword.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(UpdateUserPassword.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(UpdateUserPassword.rejected, (state, action) => {
      state.loading = true;
      state.error = action.error.message;
    });
  },
});
export const { setAuthToken, setAdmin, handleLogout, setUser, getUser } =
  authSlice.actions;

export default authSlice.reducer;
