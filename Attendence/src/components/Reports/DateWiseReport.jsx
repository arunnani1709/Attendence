import React, { useState } from 'react';

const dateReports = {
  '2025-06-01': {
    present: 110,
    absent: 15,
    totalMarks: 400,
    subjects: [
      { subject: 'Math', marks: 80 },
      { subject: 'Science', marks: 85 },
      { subject: 'English', marks: 75 },
    ],
  },
  '2025-06-02': {
    present: 105,
    absent: 20,
    totalMarks: 390,
    subjects: [
      { subject: 'History', marks: 70 },
      { subject: 'Geography', marks: 80 },
    ],
  },
};

const DateWiseReport = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [showTable, setShowTable] = useState(false);

  const handleDisplay = () => {
    if (selectedDate) {
      setShowTable(true);
    }
  };

  const handleBack = () => {
    setSelectedDate('');
    setShowTable(false);
  };

  const report = dateReports[selectedDate];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-[#0a3161]">Date Wise Report</h2>

      {/* Dropdown + Display */}
      <div className="mb-6 flex items-center gap-4">
        <select
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setShowTable(false);
          }}
          className="w-64 border border-gray-400 px-4 py-2 rounded"
        >
          <option value="">Select Date</option>
          {Object.keys(dateReports).map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>

        <button
          onClick={handleDisplay}
          className={`px-6 py-2 rounded text-white ${
            selectedDate ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
          }`}
          disabled={!selectedDate}
        >
          Display
        </button>
      </div>

      {/* Report Content */}
      {showTable && report && (
        <>
          <div className="text-lg font-semibold mb-1">Attendance</div>
          <p className="mb-1">Present: {report.present}</p>
          <p className="mb-4">Absent: {report.absent}</p>

          <div className="text-lg font-semibold mb-1">Total Marks</div>
          <p className="mb-4">{report.totalMarks}</p>

          <div className="text-lg font-semibold mb-2">Subject Breakdown</div>
          <table className="w-full border border-gray-400 mb-8">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2 text-left">Subject</th>
                <th className="border px-4 py-2 text-left">Marks</th>
              </tr>
            </thead>
            <tbody>
              {report.subjects.map((subj, idx) => (
                <tr key={idx}>
                  <td className="border px-4 py-2">{subj.subject}</td>
                  <td className="border px-4 py-2">{subj.marks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Back Button */}
      {showTable && (
        <div className="mt-4">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200"
          >
            <span className="text-lg"></span>
            <span>Back</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default DateWiseReport;
