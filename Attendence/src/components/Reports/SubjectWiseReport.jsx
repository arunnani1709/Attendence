import React, { useState } from 'react';

const SubjectWiseReport = () => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [showReport, setShowReport] = useState(false);

  const subjectData = {
    Math: {
      present: 50,
      absent: 10,
      totalMarks: 4500,
      students: [
        { name: 'Student A', marks: 80 },
        { name: 'Student B', marks: 70 },
        { name: 'Student C', marks: 75 },
      ],
    },
    Science: {
      present: 48,
      absent: 12,
      totalMarks: 4300,
      students: [
        { name: 'Student X', marks: 85 },
        { name: 'Student Y', marks: 72 },
        { name: 'Student Z', marks: 79 },
      ],
    },
    English: {
      present: 55,
      absent: 5,
      totalMarks: 4700,
      students: [
        { name: 'Student M', marks: 90 },
        { name: 'Student N', marks: 84 },
        { name: 'Student O', marks: 88 },
      ],
    },
  };

  const reportData = subjectData[selectedSubject];

  const handleDisplay = () => {
    if (selectedSubject && subjectData[selectedSubject]) {
      setShowReport(true);
    }
  };

  const handleBack = () => {
    setSelectedSubject('');
    setShowReport(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-[#0a3161]">Subject Wise Report</h2>

      {!showReport && (
        <div className="flex items-center space-x-4 mb-6">
          <select
            className="border border-gray-400 px-4 py-2 rounded"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="">Select Subject</option>
            {Object.keys(subjectData).map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>

          {selectedSubject && (
            <button
              onClick={handleDisplay}
              className="px-6 py-2 rounded text-white bg-blue-600 hover:bg-blue-700"
            >
              Display
            </button>
          )}
        </div>
      )}

      {showReport && reportData && (
        <>
          <div className="text-lg font-semibold mb-1">Attendance</div>
          <p className="mb-1">Present: {reportData.present}</p>
          <p className="mb-4">Absent: {reportData.absent}</p>

          <div className="text-lg font-semibold mb-1">Marks</div>
          <p className="mb-4">Total: {reportData.totalMarks}</p>

          <div className="text-lg font-semibold mb-2">Student Breakdown</div>
          <table className="w-full border border-gray-400 mb-8">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-400 px-4 py-2 text-left">Student Name</th>
                <th className="border border-gray-400 px-4 py-2 text-left">Marks</th>
              </tr>
            </thead>
            <tbody>
              {reportData.students.map((student, index) => (
                <tr key={index}>
                  <td className="border border-gray-400 px-4 py-2">{student.name}</td>
                  <td className="border border-gray-400 px-4 py-2">{student.marks}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={handleBack}
            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Back
          </button>
        </>
      )}
    </div>
  );
};

export default SubjectWiseReport;
