import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

export const postTweet = createAsyncThunk(
  "post/createPost",
  async ({ content, userId, token, imageURL }) => {
    try {
      const response = await axios.post(
        "https://zushoc-benw.onrender.com/post",
        {
          post: {
            content,
            imageURL,
            likedUsers: [],
          },
          userId,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );

      return response.data.data;
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
        `https://zushoc-benw.onrender.com/post/userpost/${username}`,
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
    const response = await axios.get("https://zushoc-benw.onrender.com/feed", {
      headers: {
        authorization: token,
      },
    });

    return response.data.response;
  } catch (err) {
    console.log({ err });
  }
});

export const likePost = createAsyncThunk(
  "post/likePost",
  async ({ postId, userId, token }) => {
    try {
      let response = await axios.put(
        `https://zushoc-benw.onrender.com/post/like/${postId}`,
        { userId },
        {
          headers: {
            authorization: token,
          },
        }
      );

      return response.data.post;
    } catch (err) {
      console.log(err);
    }
  }
);
export const unlikePost = createAsyncThunk(
  "post/unlikePost",
  async ({ postId, userId, token }) => {
    try {
      let response = await axios.post(
        `https://zushoc-benw.onrender.com/post/unlike/${postId}`,
        { userId },
        {
          headers: {
            authorization: token,
          },
        }
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
      state.feedPost = [...state.feedPost, action.payload];
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

    [likePost.fulfilled]: (state, action) => {
      console.log(action.payload);

      let post = state.feedPost.find(
        (likedPost) => likedPost._id === action.payload?._id
      );
      if (action.payload?.likedBy) {
        post.likedBy = action.payload?.likedBy;
      }
    },
    [unlikePost.fulfilled]: (state, action) => {
      let post = state.feedPost.find(
        (unlikedPost) => unlikedPost._id === action.payload._id
      );
      if (action.payload?.likedBy) {
        post.likedBy = action.payload?.likedBy;
      }
    },
  },
});

export default postSlice.reducer;
