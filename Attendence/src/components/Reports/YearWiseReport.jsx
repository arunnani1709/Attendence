import React from 'react';

const YearWiseReport = ({ year, data, onBack }) => {
  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <button
        onClick={onBack}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Back
      </button>

      <h2 className="text-2xl font-bold text-[#0a3161] mb-4">Year-wise Report: {year}</h2>

      <p className="mb-2">Total Students: {data.totalStudents}</p>
      <p className="mb-2">Average Marks: {data.avgMarks}</p>
      <p className="mb-2">Top Performer: {data.topPerformer}</p>

      <h3 className="text-xl font-semibold mt-6">Subjects:</h3>
      <ul className="list-disc pl-5">
        {data.subjects.map((subject, index) => (
          <li key={index}>
            {subject.name}: {subject.avgMarks} average marks
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YearWiseReport;
