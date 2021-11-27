import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const signupUser = createAsyncThunk(
  "auth/signup",
  async ({ name, username, email, password }) => {
    try {
      const response = await axios.post(
        "https://zushoc-backend.neithalrajpuroh.repl.co/auth/signup/new",
        {
          name,
          username,
          email,
          password,
          bio: `Hello!I am ${name}`,
          profileURL:
            "https://res.cloudinary.com/dlfkr6n8m/image/upload/v1637319359/user_suozwg.png",
          followingList: [],
          followersList: [],
        }
      );
      if (response.status === 200) {
        localStorage.setItem(
          "login",
          JSON.stringify({ token: response.data.token, isUserLogedIn: true })
        );
      }
      return response.data;
    } catch (err) {
      console.log({ err });
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    try {
      const response = await axios.post(
        "https://zushoc-backend.neithalrajpuroh.repl.co/auth/login",
        {
          email,
          password,
        }
      );
      if (response.status === 200) {
        localStorage.setItem(
          "login",
          JSON.stringify({ token: response.data.token, isUserLogedIn: true })
        );
      }
      return response.data;
    } catch (err) {
      console.log({ err });
    }
  }
);
export const getFollowSuggestions = createAsyncThunk(
  "auth/getAll",
  async ({ token }) => {
    try {
      const response = await axios.get(
        "https://zushoc-backend.neithalrajpuroh.repl.co/auth/getAll",
        {
          header: {
            authorization: token,
          },
        }
      );

      return response.data.user;
    } catch (err) {
      console.log({ err });
    }
  }
);

export const getUserData = createAsyncThunk(
  "auth/username",
  async (username, token) => {
    try {
      const response = await axios.get(
        `https://zushoc-backend.neithalrajpuroh.repl.co/auth/${username}`,
        {
          headers: {
            authorization: token,
          },
        }
      );

      return response.data.userDetails;
    } catch (err) {
      console.log(err);
    }
  }
);

export const addFollowUser = createAsyncThunk(
  "auth/new",
  async ({ followUserId, userId }) => {
    try {
      const res = await axios.post(
        "https://zushoc-backend.neithalrajpuroh.repl.co/auth/follow/new",
        {
          followUserId,
          userId,
        }
      );

      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const removeFollowing = createAsyncThunk(
  "auth/unfollow",
  async ({ followUserId, userId }) => {
    try {
      const res = await axios.post(
        "https://zushoc-backend.neithalrajpuroh.repl.co/auth/follow/remove",
        {
          followUserId,
          userId,
        }
      );

      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: {
      _id: "",
      name: "",
      email: "",
      username: "",
      bio: "",
      profileURL: "",
      followingList: [],
      followersList: [],
    },
    followUser: "",
    token: "",
    isUserLogedIn: false,
    isError: false,
    userCreatedPost: [],
    userLoading: false,
    followUsers: [],
    errorMessage: "",
  },

  reducers: {
    logOutUser(state) {
      localStorage.removeItem("login");
      state.data = {
        _id: "",
        name: "",
        email: "",
        username: "",
        bio: "",
        profileURL: "",
        followingList: [],
        followersList: [],
      };
      state.token = "";
      state.isUserLogedIn = false;
      state.userLoading = false;
      state.isError = false;
      state.errorMessage = "";
    },
  },

  extraReducers: {
    [signupUser.pending]: (state, action) => {
      state.isUserLoading = true;
    },
    [signupUser.fulfilled]: (state, action) => {
      state.userLoading = false;
      state.isUserLogedIn = true;
      state.data = action.payload?.userData;
      state.token = action.payload.token;
      state.isError = false;
      state.errorMessage = "";
    },
    [signupUser.rejected]: (state, action) => {
      state.userLoading = true;
      state.isError = true;
      state.errorMessage = action.error.message;
    },
    [loginUser.pending]: (state, action) => {
      state.isUserLoading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.userLoading = false;
      state.isUserLogedIn = true;

      state.data = action.payload?.user;
      state.token = action.payload.token;

      state.isError = false;
      state.errorMessage = "";
    },
    [loginUser.rejected]: (state, action) => {
      state.userLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    },
    [getFollowSuggestions.pending]: (state, action) => {
      state.userLoading = true;
    },
    [getFollowSuggestions.fulfilled]: (state, action) => {
      state.isError = false;
      state.userLoading = false;
      state.followUsers = action.payload;
    },
    [getFollowSuggestions.rejected]: (state, action) => {
      state.isError = true;
      state.errorMessage = action.error.message;
    },
    [getUserData.pending]: (state, action) => {
      state.userLoading = true;
    },
    [getUserData.fulfilled]: (state, action) => {
      state.userLoading = false;
      state.isUserLoggedIn = true;
      state.followUser = action.payload;
    },
    [getUserData.rejected]: (state, action) => {
      state.isError = true;
      state.errorMessage = action.error.message;
    },
    [addFollowUser.pending]: (state, action) => {
      state.userLoading = true;
    },
    [addFollowUser.fulfilled]: (state, action) => {
      state.userLoading = false;

      state.followUser = action.payload?.followUser;
    },
    [addFollowUser.rejected]: (state, action) => {
      state.isError = true;
      state.errorMessage = action.error.message;
    },
    [removeFollowing.pending]: (state, action) => {
      state.userLoading = true;
    },
    [removeFollowing.fulfilled]: (state, action) => {
      state.userLoading = false;
      state.followUser = action.payload?.followUser;
    },
    [removeFollowing.rejected]: (state, action) => {
      state.isError = true;
      state.errorMessage = action.error.message;
    },
  },
});
export const { logOutUser } = authSlice.actions;

export default authSlice.reducer;
