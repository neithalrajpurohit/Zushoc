import React from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./common/components/Header";
import { Signup } from "./features/auth/pages/SignUpPage";
import { Login } from "./features/auth/pages/LoginPage";
import { Home } from "./features/posts/pages/feed/Home";
import { PrivateRoute } from "./common/components/PrivateRoute";
import { Profile } from "./features/auth/pages/profile/Profile";
import { FollowSuggestions } from "./common/components/FollowSuggestions";
import "./App.css";
import { useSelector } from "react-redux";
import { FollowUserProfile } from "./common/components/FollowUserProfile";

function App() {
  const loggedIn = useSelector((state) => state.auth.isUserLogedIn);
  return (
    <div className="App">
      {loggedIn && <Header />}
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/follow/:username"
          element={
            <PrivateRoute>
              <FollowUserProfile />
            </PrivateRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/followsuggestions"
          element={
            <PrivateRoute>
              <FollowSuggestions />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
