import { configureStore } from "@reduxjs/toolkit";
import posts from "./slice/posts";
import auth from "./slice/auth";
import comments from "./slice/comments";

const store = configureStore({
  reducer: {
    auth: auth,
    posts: posts,
    comments: comments,
  },
});


export default store;
