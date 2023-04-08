import { createPost, getPosts, tagAdd, tagUpdate, updatePost } from "@/Config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  per_page: 4,
  loading: true,
  updating: false,
  error: null,
};

export const getAllPosts = createAsyncThunk(
  "posts/getPosts",
  async (page, { rejectWithValue }) => {
    try {
      const res = await getPosts();
      // console.log(res.data)
      return res.data;
    } catch (err) {
      return rejectWithValue({ error: err.message });
    }
  }
);
export const addPost = createAsyncThunk(
  // The name of the action
  "posts/addPost",
  // The payload creator
  async ({ title, text }, { rejectWithValue }) => {
    try {
      const res = await createPost(title, text);
      return res.data.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue({ error: error.response.data.message });
      } else {
        return rejectWithValue({ error: error.message });
      }
    }
  }
);
export const updatePostDetails = createAsyncThunk(
  // The name of the action
  "posts/updatePost",
  // The payload creator
  async ({ id, title, text }, { rejectWithValue }) => {
    try {
      const update = await updatePost(id, title, text);
      if ((update.data.status = 200)) {
        const res = await getPosts();
        return res.data.data;
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue({ error: error.response.data.message });
      } else {
        return rejectWithValue({ error: error.message });
      }
    }
  }
);

export const addTag = createAsyncThunk(
  // The name of the action
  "posts/addTag",
  // The payload creator
  async ({ id, text }, { rejectWithValue }) => {
    try {
      const update = await await tagAdd(id, text);
      // console.log(update.data)
      if ((update.data.status = 200)) {
        const res = await getPosts();
        // console.log(res.data)
        return res.data.data;
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue({ error: error.response.data.message });
      } else {
        return rejectWithValue({ error: error.message });
      }
    }
  }
);
export const updateTag = createAsyncThunk(
  // The name of the action
  "posts/updateTag",
  // The payload creator
  async ({ blog_id, text, id }, { rejectWithValue }) => {
    try {
      const update = await await tagUpdate(blog_id, text, id);
      // console.log(update.data)
      if ((update.data.status = 200)) {
        const res = await getPosts();
        // console.log(res.data)
        return res.data.data;
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue({ error: error.response.data.message });
      } else {
        return rejectWithValue({ error: error.message });
      }
    }
  }
);


const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    handlePrev: (state, action) => {
      state.per_page = state.per_page - action.payload;
    },
    handleNext : (state, action) => {
      state.per_page = state.per_page + action.payload;
    },
  },
  extraReducers: (builder) => {
    // get posts data
    builder.addCase(getAllPosts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload.data;
    });

    builder.addCase(getAllPosts.rejected, (state, action) => {
      state.loading = true;
      state.error = action.error.message;
    });
    // add new post
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
    // update post
    builder.addCase(updatePostDetails.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updatePostDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });

    builder.addCase(updatePostDetails.rejected, (state, action) => {
      state.loading = true;
      state.error = action.error.message;
    });
// add tag
    builder.addCase(addTag.pending, (state, action) => {
      // state.loading = true;
    });
    builder.addCase(addTag.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });

    builder.addCase(addTag.rejected, (state, action) => {
      state.loading = true;
      state.error = action.error.message;
    });

// update tag
    builder.addCase(updateTag.pending, (state, action) => {
      // state.loading = true;
    });
    builder.addCase(updateTag.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });

    builder.addCase(updateTag.rejected, (state, action) => {
      state.loading = true;
      state.error = action.error.message;
    });
  },
});

export const { handlePrev, handleNext } = postSlice.actions;

export default postSlice.reducer;
