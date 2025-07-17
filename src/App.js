import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Profile from "./components/Profile";
import AllStudents from "./components/AllStudents";
import PayFees from "./components/PayFees";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<AllStudents />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/pay" element={<PayFees />} />
      </Routes>
    </Router>
  );
}

export default App;
