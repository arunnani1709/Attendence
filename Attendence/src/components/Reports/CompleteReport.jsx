import React, { useState } from "react";
import TeacherWiseReport from "./TeacherWiseReport";
import SubjectWiseReport from "./SubjectWiseReport";
import DateWiseReport from "./DateWiseReport";
import StudentWiseReport from "./StudentWiseReport";
import MonthWiseReport from "./MonthWiseReport";
import YearWiseReport from "./YearWiseReport";

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

        {/* Subject Wise */}
        <div>
          <div className="flex items-center gap-4">
            <span className="text-lg font-medium">Subject wise</span>
            <button
              onClick={() => toggleReport("subject")}
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
          {visibleReport === "subject" && (
            <div className="mt-4 border border-gray-300 p-4 rounded">
              <SubjectWiseReport />
            </div>
          )}
        </div>

        {/* Date Wise */}
        <div>
          <div className="flex items-center gap-4">
            <span className="text-lg font-medium">Date wise</span>
            <button
              onClick={() => toggleReport("date")}
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
          {visibleReport === "date" && (
            <div className="mt-4 border border-gray-300 p-4 rounded">
              <DateWiseReport />
            </div>
          )}
        </div>

        {/* Month Wise */}
        <div>
          <div className="flex items-center gap-4">
            <span className="text-lg font-medium">Month wise</span>
            <button
              onClick={() => toggleReport("month")}
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
          {visibleReport === "month" && (
            <div className="mt-4 border border-gray-300 p-4 rounded">
              <MonthWiseReport />
            </div>
          )}
        </div>

        {/* Year Wise */}
        <div>
          <div className="flex items-center gap-4">
            <span className="text-lg font-medium">Year wise</span>
            <button
              onClick={() => toggleReport("year")}
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
          {visibleReport === "year" && (
            <div className="mt-4 border border-gray-300 p-4 rounded">
              <YearWiseReport />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompleteReport;
