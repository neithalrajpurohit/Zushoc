import React from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./common/components/Header";
import { Signup } from "./features/auth/pages/SignUpPage";
import { Login } from "./features/auth/pages/LoginPage";
import { Home } from "./common/components/Home";
import { PrivateRoute } from "./common/components/PrivateRoute";
import { Profile } from "./common/components/Profile";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
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
