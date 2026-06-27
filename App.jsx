import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import KidsWear from "./Pages/KidsWear";
import MensWear from "./Pages/MensWear";
import Login from "./Pages/Login";

import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  return (
    <Routes>

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/kids"
        element={
          <ProtectedRoute>
            <KidsWear />
          </ProtectedRoute>
        }
      />

      <Route
        path="/mens"
        element={
          <ProtectedRoute>
            <MensWear />
          </ProtectedRoute>
        }
      />

      <Route
        path="/login"
        element={<Login />}
      />

    </Routes>
  );
};

export default App;
