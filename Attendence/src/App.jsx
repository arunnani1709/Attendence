// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./output.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";

// Import your actual components here
import CompleteReport from "./components/Reports/CompleteReport";
// import Attendance from "./pages/Attendance";
// import Marks from "./pages/Marks";
import SubjectWise from "./components/Reports/SubjectWiseReport";
import DateWiseReport from "./components/Reports/DateWiseReport";
// import YearWise from "./pages/YearWise";
// import Dashboard from "./pages/Dashboard"; // If you have a Dashboard page

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
              {/* <Route path="/admin/attendance" element={<Attendance />} /> */}
              {/* <Route path="/admin/marks" element={<Marks />} /> */}
              <Route path="/admin/subject-wise" element={<SubjectWise />} />
               <Route path="/admin/month-wise" element={<DateWiseReport />} />

              {/* <Route path="/admin/year-wise" element={<YearWise />} /> */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
