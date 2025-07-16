import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TeacherWiseReport = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [yearLevels] = useState(["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"]);
  const [selectedYear, setSelectedYear] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjectCode, setSelectedSubjectCode] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTeachers([
      {
        id: 1,
        name: "Dr. Mehta",
        subjects: {
          "1st Year": { name: "Anatomy", code: "ANAT101" },
          "2nd Year": { name: "Physiology", code: "PHYS201" },
        },
      },
      {
        id: 2,
        name: "Dr. Iyer",
        subjects: {
          "1st Year": { name: "Biochemistry", code: "BIOC102" },
          "3rd Year": { name: "Pathology", code: "PATH301" },
        },
      },
      {
        id: 3,
        name: "Dr. Shah",
        subjects: {
          "2nd Year": { name: "Pharmacology", code: "PHAR202" },
          "4th Year": { name: "Microbiology", code: "MICR401" },
        },
      },
      {
        id: 4,
        name: "Dr. Rani",
        subjects: {
          "3rd Year": { name: "Forensic Medicine", code: "FORE302" },
          "4th Year": { name: "ENT", code: "ENT402" },
        },
      },
      {
        id: 5,
        name: "Dr. Thomas",
        subjects: {
          "2nd Year": { name: "Community Medicine", code: "COMM203" },
          "5th Year": { name: "Surgery", code: "SURG501" },
        },
      },
      {
        id: 6,
        name: "Dr. Arora",
        subjects: {
          "4th Year": { name: "Obstetrics", code: "OBST403" },
          "5th Year": { name: "Paediatrics", code: "PAED502" },
        },
      },
    ]);
  }, []);

  useEffect(() => {
    const teacher = teachers.find((t) => t.id.toString() === selectedTeacherId);
    setSelectedTeacher(teacher);

    if (teacher && selectedYear) {
      const subject = teacher.subjects[selectedYear];
      setSubjects(subject ? [subject] : []);
      setSelectedSubjectCode(subject ? subject.code : "");
    } else {
      setSubjects([]);
      setSelectedSubjectCode("");
    }
  }, [selectedTeacherId, selectedYear, teachers]);

  const generateReport = () => {
    if (!selectedTeacher || !selectedSubjectCode || !fromDate || !toDate || !selectedYear) {
      alert("Please fill all fields before generating the report.");
      return;
    }

    const selectedSubject = subjects.find((s) => s.code === selectedSubjectCode);

    setLoading(true);
    setTimeout(() => {
      setReportData({
        teacherId: selectedTeacher.id,
        teacherName: selectedTeacher.name,
        subjectName: selectedSubject.name,
        subjectCode: selectedSubject.code,
        totalStudents: 3,
        summary: {
          totalClasses: 48,
          attendancePercentage: 91,
          mostAbsentDay: "2025-07-01",
          mostPresentDay: "2025-07-03",
        },
        students: [
          { name: "Ananya", roll: 1, present: 44, attendance: 91.6 },
          { name: "Rahul", roll: 2, present: 43, attendance: 89.6 },
          { name: "Neha", roll: 3, present: 45, attendance: 93.7 },
        ],
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-blue-700">📊 Teacher Wise Attendance Report</h1>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {/* Teacher Dropdown */}
        <select
          value={selectedTeacherId}
          onChange={(e) => setSelectedTeacherId(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select Teacher</option>
          {teachers.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name} (ID: {t.id})
            </option>
          ))}
        </select>

        {/* Year Dropdown */}
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select Year</option>
          {yearLevels.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        {/* Subject Dropdown */}
        <select
          value={selectedSubjectCode}
          onChange={(e) => setSelectedSubjectCode(e.target.value)}
          className="border p-2 rounded"
          disabled={subjects.length === 0}
        >
          <option value="">Select Subject</option>
          {subjects.map((subj, idx) => (
            <option key={idx} value={subj.code}>
              {subj.name} ({subj.code})
            </option>
          ))}
        </select>

        {/* From Date */}
        <DatePicker
          selected={fromDate}
          onChange={(date) => setFromDate(date)}
          placeholderText="From Date"
          className="border p-2 rounded w-full"
          dateFormat="yyyy-MM-dd"
        />

        {/* To Date */}
        <DatePicker
          selected={toDate}
          onChange={(date) => setToDate(date)}
          placeholderText="To Date"
          className="border p-2 rounded w-full"
          dateFormat="yyyy-MM-dd"
        />

        {/* Generate Button */}
        <button
          onClick={generateReport}
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
        >
          Generate
        </button>
      </div>

      {loading && <p className="text-gray-600">Generating report...</p>}

      {reportData && (
        <>
          <div className="bg-gray-100 p-4 rounded shadow-md mt-4">
            <h2 className="text-xl font-semibold mb-2">📌 Summary</h2>
            <p><strong>Teacher:</strong> {reportData.teacherName} (ID: {reportData.teacherId})</p>
            <p><strong>Subject:</strong> {reportData.subjectName} ({reportData.subjectCode})</p>
            <p><strong>Total Students:</strong> {reportData.totalStudents}</p>
            <p><strong>Total Classes Taken:</strong> {reportData.summary.totalClasses}</p>
            <p><strong>Overall Attendance:</strong> {reportData.summary.attendancePercentage}%</p>
            <p><strong>Most Absent Day:</strong> {reportData.summary.mostAbsentDay}</p>
            <p><strong>Most Present Day:</strong> {reportData.summary.mostPresentDay}</p>
          </div>

          <div className="overflow-x-auto mt-6">
            <table className="table-auto w-full border border-gray-300">
              <thead className="bg-blue-100 text-left">
                <tr>
                  <th className="p-2 border">Roll No</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Classes Present</th>
                  <th className="p-2 border">Attendance %</th>
                </tr>
              </thead>
              <tbody>
                {reportData.students.map((student, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="p-2 border">{student.roll}</td>
                    <td className="p-2 border">{student.name}</td>
                    <td className="p-2 border">{student.present}</td>
                    <td className="p-2 border">{student.attendance.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default TeacherWiseReport;
