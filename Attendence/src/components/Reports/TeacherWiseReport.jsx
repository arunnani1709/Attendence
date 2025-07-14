import React, { useState } from 'react';

const teacherReports = {
  john: {
    present: 120,
    absent: 10,
    totalMarks: 425,
    subjects: [
      { subject: 'Math', marks: 90 },
      { subject: 'Science', marks: 85 },
      { subject: 'History', marks: 75 },
    ],
  },
  jane: {
    present: 95,
    absent: 5,
    totalMarks: 410,
    subjects: [
      { subject: 'English', marks: 88 },
      { subject: 'Geography', marks: 87 },
    ],
  },
};

const TeacherWiseReport = () => {
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [showTable, setShowTable] = useState(false);

  const handleDisplay = () => {
    if (selectedTeacher) {
      setShowTable(true);
    }
  };

  const handleBack = () => {
    // Reset all state to go back to the initial view
    setSelectedTeacher('');
    setShowTable(false);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Optional scroll to top
  };

  const report = teacherReports[selectedTeacher];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-[#0a3161]">Teacher Wise Report</h2>

      {/* Initial View: Dropdown and Display Button */}
      {!showTable && (
        <div className="mb-6 flex items-center gap-4">
          <select
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(e.target.value)}
            className="w-64 border border-gray-400 px-4 py-2 rounded"
          >
            <option value="">Select Teacher</option>
            <option value="john">John Doe</option>
            <option value="jane">Jane Smith</option>
          </select>

          {selectedTeacher && (
            <button
              onClick={handleDisplay}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Display
            </button>
          )}
        </div>
      )}

      {/* Report View */}
      {showTable && report && (
        <>
          <div className="text-lg font-semibold mb-1">Attendance</div>
          <p className="mb-1">Present: {report.present}</p>
          <p className="mb-4">Absent: {report.absent}</p>

          <div className="text-lg font-semibold mb-1">Total Marks</div>
          <p className="mb-4">{report.totalMarks}</p>

          <div className="text-lg font-semibold mb-2">Subject Breakdown</div>
          <table className="w-full border border-gray-400 mb-4">
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

          {/* Back Button */}
          <button
            onClick={handleBack}
            className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Back
          </button>
        </>
      )}
    </div>
  );
};

export default TeacherWiseReport;
