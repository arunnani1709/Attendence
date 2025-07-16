import React, { useState } from "react";
import TeacherWiseReport from "./TeacherWiseReport";
import StudentWiseReport from "./StudentWiseReport";

const CompleteReport = () => {
  const [visibleReport, setVisibleReport] = useState("");

  const toggleReport = (type) => {
    setVisibleReport((prev) => (prev === type ? "" : type));
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-[#0a3161] mb-2">Admin Login</h1>
      <h2 className="text-2xl font-semibold text-[#0a3161] mb-6">
        Complete report
      </h2>

      <div className="space-y-4 text-[#0a3161]">
        {/* Teacher Wise */}
        <div>
          <div className="flex items-center gap-4">
            <span className="text-lg font-medium">Teacher wise</span>
            <button
              onClick={() => toggleReport("teacher")}
              className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Display
            </button>
            <button
              className="px-4 py-1 bg-gray-200 text-gray-600 rounded cursor-not-allowed"
              disabled
            >
              PDF
            </button>
          </div>
          {visibleReport === "teacher" && (
            <div className="mt-4 border border-gray-300 p-4 rounded">
              <TeacherWiseReport />
            </div>
          )}
        </div>

        {/* Student Wise */}
        <div>
          <div className="flex items-center gap-4">
            <span className="text-lg font-medium">Student wise</span>
            <button
              onClick={() => toggleReport("student")}
              className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Display
            </button>
            <button
              className="px-4 py-1 bg-gray-200 text-gray-600 rounded cursor-not-allowed"
              disabled
            >
              PDF
            </button>
          </div>
          {visibleReport === "student" && (
            <div className="mt-4 border border-gray-300 p-4 rounded">
              <StudentWiseReport />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompleteReport;
