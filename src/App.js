import React from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./common/components/Header";
import { Signup } from "./features/auth/pages/SignUpPage";
import { Login } from "./features/auth/pages/LoginPage";
import { Home } from "./common/components/Home";
import { PrivateRoute } from "./common/components/PrivateRoute";
import { Profile } from "./features/auth/pages/profile/Profile";
import "./App.css";
import { useSelector } from "react-redux";

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
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
