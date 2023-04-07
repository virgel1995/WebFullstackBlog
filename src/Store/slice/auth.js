import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SignIn, SignUp, getUserDetails, setToken } from "@/Config";
import { useDispatch } from "react-redux";

const initialState = {
  isLoggedIn: false,
  isAdmin: false,
  user: null,
  token: null,
  code: null,
  loading: true,
  error: null,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ name, password, gender, age }, thunkAPI) => {
    try {
      const res = await SignUp(name, password, gender, age);
      return res.data;
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue({ error: error.response.data.message });
      } else {
        return thunkAPI.rejectWithValue({ error: err.message });
      }
    }
  }
);

export const LoginUser = createAsyncThunk(
  "auth/login",
  async ({ name, password },{ dispatch, thunkAPI}) => {
    try {
      const res = await SignIn(name, password);
      setToken(res.data.data.token);
     const user = await getUserDetails().then(async ({ data }) => {
				if (data.type === "admin") {
				  dispatch(setAdmin(true))
				}
				 dispatch(setUser(data))
         console.log(data)

			})
      return res.data.data;
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue({ error: error.response.data.message });
      } else {
        return thunkAPI.rejectWithValue({ error: error.message });
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
      state.token = null;
      state.user = null;
      state.loading = true;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    getUser : (state, action) => {
      state.user = action.paylaod
    }
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
      state.token = action.payload.token;
    });
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.loading = true;
      state.error = action.error.message;
    });
  },
});
export const { setAuthToken, setAdmin, handleLogout, setUser, getUser } = authSlice.actions;

export default authSlice.reducer;
