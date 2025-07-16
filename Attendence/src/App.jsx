// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./output.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";

// Import your actual components here
import CompleteReport from "./components/Reports/CompleteReport";
import TeacherWiseReport from "./components/Reports/TeacherWiseReport";
import StudentWiseReport from "./components/Reports/StudentWiseReport";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <Navbar />

          <div className="flex-1 bg-gray-100">
            <Routes>
              {/* <Route path="/" element={<Dashboard />} /> */}
              <Route path="/admin/complete-report" element={<CompleteReport />} />
              <Route path="/admin/teacher-wise" element={<TeacherWiseReport />} />
              <Route path="/admin/student-wise" element={<StudentWiseReport />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
