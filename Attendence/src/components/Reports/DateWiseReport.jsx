import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Extended attendance data with diverse subjects, roll numbers, and classes
const sampleData = [
  { date: "2025-07-01", name: "Aditi S", roll: 101, class: "2nd year MBBS A", subject: "Pathology (MED201)", present: 1, absent: 0 },
  { date: "2025-07-02", name: "Neha G", roll: 102, class: "3rd year MBBS B", subject: "Anatomy (MED101)", present: 1, absent: 0 },
  { date: "2025-07-03", name: "Ravi R", roll: 201, class: "1st year MBBS A", subject: "Physiology (MED102)", present: 0, absent: 1 },
  { date: "2025-07-04", name: "Riya S", roll: 202, class: "2nd year MBBS B", subject: "Pathology (MED201)", present: 1, absent: 0 },
  { date: "2025-07-05", name: "Aman K", roll: 301, class: "2nd Year MBBS A", subject: "Pharmacology (MED202)", present: 0, absent: 1 },
  { date: "2025-07-06", name: "Kiran J", roll: 302, class: "1st year MBBS B", subject: "Microbiology (MED203)", present: 1, absent: 0 },
  { date: "2025-07-07", name: "Deepa M", roll: 401, class: "3rd Year MBBS A", subject: "Biochemistry (MED103)", present: 1, absent: 0 },
  { date: "2025-07-08", name: "Ajay P", roll: 402, class: "1st Year MBBS B", subject: "Anatomy (MED101)", present: 0, absent: 1 },
  { date: "2025-07-09", name: "Meena D", roll: 501, class: "2nd Year MBBS B", subject: "Pathology (MED201)", present: 1, absent: 0 },
];

const formatDate = (date) => new Date(date).toISOString().split("T")[0];

const DateWiseReport = () => {
  const today = new Date();
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(today);
  const [filteredData, setFilteredData] = useState([]);
  const [stats, setStats] = useState(null);

  const handleGenerate = () => {
    if (!fromDate || !toDate || fromDate > toDate) {
      alert("Please select a valid date range");
      return;
    }

    const from = formatDate(fromDate);
    const to = formatDate(toDate);

    const filtered = sampleData.filter(
      (entry) => entry.date >= from && entry.date <= to
    );
    setFilteredData(filtered);

    const totalPresent = filtered.reduce((sum, e) => sum + e.present, 0);
    const totalAbsent = filtered.reduce((sum, e) => sum + e.absent, 0);
    const attendancePercent = Math.round(
      (totalPresent / (totalPresent + totalAbsent || 1)) * 100
    );

    setStats({
      total: filtered.length,
      attendancePercent,
      fromDate: from,
      toDate: to,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-blue-700 flex items-center mb-6">
        📆 Date Wise Attendance Report
      </h1>

      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">From Date</label>
          <DatePicker
            selected={fromDate}
            onChange={(date) => setFromDate(date)}
            maxDate={toDate}
            dateFormat="yyyy-MM-dd"
            className="border rounded px-3 py-2"
            placeholderText="Select From Date"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">To Date</label>
          <DatePicker
            selected={toDate}
            onChange={(date) => setToDate(date)}
            minDate={fromDate}
            maxDate={today}
            dateFormat="yyyy-MM-dd"
            className="border rounded px-3 py-2"
            placeholderText="Select To Date"
          />
        </div>
        <button
          onClick={handleGenerate}
          className="bg-blue-600 text-white px-4 py-2 mt-6 md:mt-5 rounded hover:bg-blue-700"
        >
          Generate Report
        </button>
      </div>

      {stats && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-100 p-4 rounded text-center">
              <div className="text-sm text-gray-600">Total Records</div>
              <div className="text-xl font-semibold">{stats.total}</div>
            </div>
            <div className="bg-gray-100 p-4 rounded text-center">
              <div className="text-sm text-gray-600">Attendance %</div>
              <div className="text-xl font-semibold">{stats.attendancePercent} %</div>
            </div>
            <div className="bg-gray-100 p-4 rounded text-center">
              <div className="text-sm text-gray-600">From Date</div>
              <div className="text-xl font-semibold">{stats.fromDate}</div>
            </div>
            <div className="bg-gray-100 p-4 rounded text-center">
              <div className="text-sm text-gray-600">To Date</div>
              <div className="text-xl font-semibold">{stats.toDate}</div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 border">Date</th>
                  <th className="px-4 py-2 border">Student Name</th>
                  <th className="px-4 py-2 border">Roll No.</th>
                  <th className="px-4 py-2 border">Class</th>
                  <th className="px-4 py-2 border">Subject</th>
                  <th className="px-4 py-2 border">Present</th>
                  <th className="px-4 py-2 border">Absent</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((entry, i) => (
                    <tr key={i} className="border">
                      <td className="px-4 py-2 border">{entry.date}</td>
                      <td className="px-4 py-2 border">{entry.name}</td>
                      <td className="px-4 py-2 border">{entry.roll}</td>
                      <td className="px-4 py-2 border">{entry.class}</td>
                      <td className="px-4 py-2 border">{entry.subject}</td>
                      <td className="px-4 py-2 border">{entry.present}</td>
                      <td className="px-4 py-2 border">{entry.absent}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-4 py-4 text-center text-gray-500">
                      No records found in this date range.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default DateWiseReport;
