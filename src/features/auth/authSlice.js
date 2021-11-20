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
    token: "",
    isUserLogedIn: false,
    isError: false,
    userCreatedPost: [],
    userLoading: false,
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
      state.isError = false;
      state.errorMessage = action.error.message;
    },
    [loginUser.pending]: (state, action) => {
      state.isUserLoading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.userLoading = false;
      state.isUserLogedIn = true;
      state.data = action.payload.userDetails;
      state.token = action.payload.token;
      state.isError = false;
      state.errorMessage = "";
    },
    [loginUser.rejected]: (state, action) => {
      state.userLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    },
  },
});
export const { logOutUser } = authSlice.actions;

export default authSlice.reducer;
