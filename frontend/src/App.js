import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "../src/Components/Dashboard/Main"
import Login from "./Components/Login/Login";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Main />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
