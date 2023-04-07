import { createComment, getComments } from "@/Config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  Tags: [],
  loading: true,
  error: null,
};

export const getAllTags = createAsyncThunk(
  "tags/getTags",
  async (id,thunkAPI) => {
    try {
      const res = await getComments(id);
      // console.log(res.data.data)
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message });
    }
  }
);
export const addComment = createAsyncThunk(
  // The name of the action
  "tags/addTag",
  // The payload creator
  async ({ id, comment }, thunkAPI) => {
    try {
      const res = await createComment(id, comment);
      return res.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue({ error: error.response.data.message });
      } else {
        return thunkAPI.rejectWithValue({ error: error.message });
      }
    }
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllComments.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllComments.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    });

    builder.addCase(getAllComments.rejected, (state, action) => {
      state.loading = true;
      state.error = action.error.message;
    });

    builder.addCase(addComment.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.loading = false;
      state.comments.push(action.payload);
    });

    builder.addCase(addComment.rejected, (state, action) => {
      state.loading = true;
      state.error = action.error.message;
    });
  },
});

// export const { addPost } = postsSlice.actions

export default commentSlice.reducer;
