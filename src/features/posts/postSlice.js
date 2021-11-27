import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const postTweet = createAsyncThunk(
  "post/createPost",
  async ({ content, userId, token, imageURL }) => {
    try {
      const response = await axios.post(
        "https://zushoc-backend.neithalrajpuroh.repl.co/post",
        {
          headers: {
            authorization: token,
          },
          post: {
            content,
            imageURL,
            likedUsers: [],
          },
          userId,
        }
      );

      return response.data.newPost;
    } catch (err) {
      console.log({ err });
    }
  }
);

export const getAllUserCreatedPosts = createAsyncThunk(
  "post/getAllUserCreatedPosts",
  async ({ token, username }) => {
    try {
      const response = await axios.get(
        `https://zushoc-backend.neithalrajpuroh.repl.co/post/userpost/${username}`,
        {
          headers: {
            authorization: token,
          },
        }
      );

      return response.data.post;
    } catch (err) {
      console.log({ err });
    }
  }
);
export const getFeed = createAsyncThunk("post/getFeed", async ({ token }) => {
  try {
    const response = await axios.get(
      "https://zushoc-backend.neithalrajpuroh.repl.co/feed",
      {
        headers: {
          authorization: token,
        },
      }
    );

    return response.data.res;
  } catch (err) {
    console.log({ err });
  }
});

export const likePost = createAsyncThunk(
  "post/likePost",
  async ({ postId, userId }) => {
    try {
      let response = await axios.post(
        `https://zushoc-backend.neithalrajpuroh.repl.co/post/${postId}`,
        { userId }
      );
      return response.data.post;
    } catch (err) {
      console.log(err);
    }
  }
);
export const unlikePost = createAsyncThunk(
  "post/unlikePost",
  async ({ postId, userId }) => {
    try {
      let response = await axios.post(
        `https://zushoc-backend.neithalrajpuroh.repl.co/post/${postId}`,
        { userId }
      );
      return response.data.post;
    } catch (err) {
      console.log(err);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState: {
    _id: "",
    isError: false,
    errorMessage: "",
    likedBy: [],
  },
  userPostList: [],
  postLoading: true,
  feedPost: [],

  reducers: {},

  extraReducers: {
    [postTweet.pending]: (state, action) => {
      state.postLoading = true;
    },
    [postTweet.fulfilled]: (state, action) => {
      state.postLoading = false;
      //   state.feedPost = [...state.feedPost, action.payLoad.post];
    },
    [postTweet.rejected]: (state, action) => {
      state.isError = true;
      state.errorMessage = "post unsuccessfull";
    },
    [getAllUserCreatedPosts.pending]: (state, action) => {
      state.postLoading = true;
    },
    [getAllUserCreatedPosts.fulfilled]: (state, action) => {
      state.postLoading = false;

      state.userPostList = action.payload;
    },
    [getAllUserCreatedPosts.rejected]: (state, action) => {
      state.isError = true;
      state.errorMessage = "Created post was unsuccessfull";
    },
    [getFeed.pending]: (state, action) => {
      state.postLoading = true;
    },
    [getFeed.fulfilled]: (state, action) => {
      state.postLoading = false;

      state.feedPost = action.payload;
    },
    [getFeed.rejected]: (state, action) => {
      state.isError = true;
      state.errorMessage = "cant get posts";
    },
  },
});

export default postSlice.reducer;
