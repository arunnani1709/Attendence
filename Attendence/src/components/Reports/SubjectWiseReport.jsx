import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const subjectsData = {
  'ANAT101 - Anatomy': {
    teacher: 'Dr. A. K. Menon',
    year: '1st Year',
    class: 'MBBS A',
    totalStudents: 50,
    totalClasses: 25,
    mostAbsentDay: '2025-06-10',
    mostPresentDay: '2025-06-05',
    students: [
      { name: 'Aditi S', roll: 201, present: 23, absent: 2 },
      { name: 'Neha Gupta', roll: 202, present: 22, absent: 3 },
      { name: 'Arjun Verma', roll: 203, present: 21, absent: 4 },
    ],
  },
  'PHYS102 - Physiology': {
    teacher: 'Dr. S. L. Rao',
    year: '1st Year',
    class: 'MBBS A',
    totalStudents: 50,
    totalClasses: 24,
    mostAbsentDay: '2025-06-07',
    mostPresentDay: '2025-06-01',
    students: [
      { name: 'Aditi S', roll: 201, present: 22, absent: 2 },
      { name: 'Neha Gupta', roll: 202, present: 21, absent: 3 },
      { name: 'Arjun Verma', roll: 203, present: 20, absent: 4 },
    ],
  },
  'BIOC103 - Biochemistry': {
    teacher: 'Dr. Meera Nair',
    year: '2nd Year',
    class: 'MBBS B',
    totalStudents: 45,
    totalClasses: 20,
    mostAbsentDay: '2025-06-15',
    mostPresentDay: '2025-06-08',
    students: [
      { name: 'Riya Sharma', roll: 301, present: 18, absent: 2 },
      { name: 'Sandeep R', roll: 302, present: 17, absent: 3 },
      { name: 'Kiran Joshi', roll: 303, present: 19, absent: 1 },
    ],
  },

  // Keeping your previous general subjects below
  'PHYS102 - Human Physiology': {
    teacher: 'Mr. Ramesh Kumar',
    year: '3rd year',
    class: 'MBBS A',
    totalStudents: 30,
    totalClasses: 20,
    mostAbsentDay: '2024-04-15',
    mostPresentDay: '2024-04-12',
    students: [
      { name: 'Aditi S', roll: 101, present: 19, absent: 1 },
      { name: 'Neha Gupta', roll: 102, present: 17, absent: 2 },
      { name: 'Arjun Verma', roll: 103, present: 16, absent: 3 },
      { name: 'Riya Sharma', roll: 104, present: 17, absent: 3 },
      { name: 'Sandeep R', roll: 105, present: 17, absent: 3 },
      { name: 'Kiran Joshi', roll: 106, present: 17, absent: 3 },
    ],
  },
  'ANAT101 - Human Anatomy': {
    teacher: 'Ms. Priya Mehta',
    year:'4th year',
    class: 'MBBS A',
    totalStudents: 30,
    totalClasses: 22,
    mostAbsentDay: '2024-04-14',
    mostPresentDay: '2024-04-10',
    students: [
      { name: 'Aditi S', roll: 101, present: 21, absent: 1 },
      { name: 'Neha Gupta', roll: 102, present: 20, absent: 2 },
      { name: 'Arjun Verma', roll: 103, present: 19, absent: 3 },
      { name: 'Riya Sharma', roll: 104, present: 18, absent: 4 },
      { name: 'Sandeep R', roll: 105, present: 19, absent: 3 },
      { name: 'Kiran Joshi', roll: 106, present: 18, absent: 4 },
    ],
  },
  'PATH201 - Pathology': {
    teacher: 'Mr. Suresh Rao',
    year: '1st year',
    class: 'MBBS A',
    totalStudents: 30,
    totalClasses: 18,
    mostAbsentDay: '2025-07-11',
    mostPresentDay: '2025-07-3',
    students: [
      { name: 'Aditi S', roll: 101, present: 17, absent: 1 },
      { name: 'Neha Gupta', roll: 102, present: 16, absent: 2 },
      { name: 'Arjun Verma', roll: 103, present: 15, absent: 3 },
      { name: 'Riya Sharma', roll: 104, present: 14, absent: 4 },
      { name: 'Sandeep R', roll: 105, present: 15, absent: 3 },
      { name: 'Kiran Joshi', roll: 106, present: 14, absent: 4 },
    ],
  },
};

const SubjectWiseReport = () => {
  const [selectedSubject, setSelectedSubject] = useState('ANAT101 - Anatomy');
  const [selectedYear, setSelectedYear] = useState('1st Year');
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [showReport, setShowReport] = useState(false);

  const handleGenerateReport = () => {
    if (selectedSubject && dateRange.start && dateRange.end) {
      setShowReport(true);
    }
  };

  const subjectData = subjectsData[selectedSubject];
  const { teacher, class: classSection, totalStudents, totalClasses, mostAbsentDay, mostPresentDay, students, year } = subjectData;
  const overallAttendance =
    (students.reduce((acc, curr) => acc + curr.present, 0) / (students.length * totalClasses)) * 100;

  return (
    <div className="p-6 space-y-6">
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-4 text-left text-blue-700">📘 Subject Wise Attendance Report</h2>

      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="border px-4 py-2 rounded w-full md:w-1/3"
        >
          {Object.keys(subjectsData).map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border px-4 py-2 rounded w-full md:w-1/4"
        >
          {['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year'].map((yearOption) => (
            <option key={yearOption} value={yearOption}>
              {yearOption}
            </option>
          ))}
        </select>

        <DatePicker
          selected={dateRange.start}
          onChange={(date) => setDateRange((prev) => ({ ...prev, start: date }))}
          placeholderText="Start Date"
          className="border px-4 py-2 rounded"
          dateFormat="yyyy-MM-dd"
        />
        <DatePicker
          selected={dateRange.end}
          onChange={(date) => setDateRange((prev) => ({ ...prev, end: date }))}
          placeholderText="End Date"
          className="border px-4 py-2 rounded"
          dateFormat="yyyy-MM-dd"
        />

        <button onClick={handleGenerateReport} className="bg-blue-600 text-white px-4 py-2 rounded">
          Generate Report
        </button>
      </div>

      {/* Report Display */}
      {showReport && (
        <div className="mt-6">
          <p className="text-sm font-medium">Subject</p>
          <p className="text-lg font-bold">{selectedSubject}</p>

          <p className="text-sm font-medium mt-2">Teacher</p>
          <p className="font-semibold">{teacher}</p>

          <p className="text-sm font-medium mt-2">Year</p>
          <p className="font-semibold">{year}</p>

          <p className="text-sm font-medium mt-2">Class</p>
          <p className="font-semibold">{classSection}</p>

          <p className="text-sm font-medium mt-2">Total Students</p>
          <p className="font-semibold">{totalStudents}</p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6">
            <div className="bg-gray-50 p-4 rounded shadow text-center">
              <p className="text-sm">Total Classes</p>
              <p className="text-xl font-semibold">{totalClasses}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded shadow text-center">
              <p className="text-sm">Overall Attendance</p>
              <p className="text-xl font-semibold">{overallAttendance.toFixed(0)} %</p>
            </div>
            <div className="bg-gray-50 p-4 rounded shadow text-center">
              <p className="text-sm">Most Absent Day</p>
              <p className="text-xl font-semibold">{mostAbsentDay}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded shadow text-center">
              <p className="text-sm">Most Present Day</p>
              <p className="text-xl font-semibold">{mostPresentDay}</p>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-100 text-left">
                <tr className="border border-gray-300">
                  <th className="py-2 px-4 border border-gray-300">Student Name</th>
                  <th className="py-2 px-4 border border-gray-300">Roll No.</th>
                  <th className="py-2 px-4 border border-gray-300">Class</th>
                  <th className="py-2 px-4 border border-gray-300">Present</th>
                  <th className="py-2 px-4 border border-gray-300">Absent</th>
                  <th className="py-2 px-4 border border-gray-300">Attendance %</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => {
                  const attendancePercent = ((s.present / totalClasses) * 100).toFixed(1);
                  return (
                    <tr key={s.roll} className="hover:bg-gray-50 border border-gray-300">
                      <td className="py-2 px-4 border border-gray-300">{s.name}</td>
                      <td className="py-2 px-4 border border-gray-300">{s.roll}</td>
                      <td className="py-2 px-4 border border-gray-300">{classSection}</td>
                      <td className="py-2 px-4 border border-gray-300">{s.present}</td>
                      <td className="py-2 px-4 border border-gray-300">{s.absent}</td>
                      <td className="py-2 px-4 border border-gray-300">{attendancePercent} %</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectWiseReport;
