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
      state.feedPost = [...state.feedPost, action.payLoad.post];
    },
  },
});

export default postSlice.reducer;
