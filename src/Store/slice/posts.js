import { createPost, getPosts, updatePost } from "@/Config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  loading: true,
  updating: false,
  error: null,
};

export const getAllPosts = createAsyncThunk(
  "posts/getPosts",
  async (thunkAPI) => {
    try {
      const res = await getPosts();
      // console.log(res.data.data)
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message });
    }
  }
);
export const addPost = createAsyncThunk(
  // The name of the action
  "posts/addPost",
  // The payload creator
  async ({ title, text }, thunkAPI) => {
    try {
      const res = await createPost(title, text);
      return res.data.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue({ error: error.response.data.message });
      } else {
        return thunkAPI.rejectWithValue({ error: error.message });
      }
    }
  }
);
export const updatePostDetails = createAsyncThunk(
  // The name of the action
  "posts/updatePost",
  // The payload creator
  async ({ id, title, text }, thunkAPI) => {
    try {
      const update = await updatePost(id, title, text);
     if(update.data.status = 200){
      const res = await getPosts();
      return res.data.data;
     }
    } catch (error) {
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue({ error: error.response.data.message });
      } else {
        return thunkAPI.rejectWithValue({ error: error.message });
      }
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost(state, action) {
      state.posts.push(action.payload);
    },
    
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPosts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });

    builder.addCase(getAllPosts.rejected, (state, action) => {
      state.loading = true;
      state.error = action.error.message;
    });
    builder.addCase(addPost.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addPost.fulfilled, (state, action) => {
      state.loading = false;
      state.posts.push(action.payload);
    });

    builder.addCase(addPost.rejected, (state, action) => {
      state.loading = true;
      state.error = action.error.message;
    });

    builder.addCase(updatePostDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });

    builder.addCase(updatePostDetails.rejected, (state, action) => {
      state.loading = true;
      state.error = action.error.message;
    });
  },
});

// export const { addPost } = postsSlice.actions

export default postSlice.reducer;
