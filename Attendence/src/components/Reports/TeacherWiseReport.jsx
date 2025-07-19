import React, { useState, useEffect } from "react";

const TeacherWiseReport = () => {
  const [teachers, setTeachers] = useState([]);
  const [topicData, setTopicData] = useState({});
  const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [availablePhases, setAvailablePhases] = useState([]);
  const [selectedPhase, setSelectedPhase] = useState("");
  const [allSubjects, setAllSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [selectedSubjectCode, setSelectedSubjectCode] = useState("");
  const [topicSchedule, setTopicSchedule] = useState([]);
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load teachers from public folder
  useEffect(() => {
    fetch("/teachers.json")
      .then((res) => res.json())
      .then((data) => setTeachers(data))
      .catch((err) => console.error("Error fetching teachers:", err));
  }, []);

  // Load topicData from public folder
  useEffect(() => {
    fetch("/topicData.json")
      .then((res) => res.json())
      .then((data) => setTopicData(data))
      .catch((err) => console.error("Error fetching topic data:", err));
  }, []);

  // Handle teacher selection
  useEffect(() => {
    const teacher = teachers.find((t) => t.id.toString() === selectedTeacherId);
    setSelectedTeacher(teacher);

    if (teacher) {
      const subjectList = teacher.subjects || [];
      setAllSubjects(subjectList);
    } else {
      setAllSubjects([]);
    }

    setSelectedPhase("");
    setSelectedSubjectCode("");
    setFilteredSubjects([]);
    setTopicSchedule([]);
    setReportData(null);
  }, [selectedTeacherId]);

  // Extract all phases from topicData
  useEffect(() => {
    setAvailablePhases(
      Object.keys(topicData || {}).flatMap((subjCode) =>
        Object.keys(topicData[subjCode])
      )
    );
  }, [topicData]);

  // Filter subjects with available data for selected phase
  useEffect(() => {
    if (!selectedPhase || allSubjects.length === 0) {
      setFilteredSubjects([]);
      setSelectedSubjectCode("");
      return;
    }

    const filtered = allSubjects.filter(
      (subj) => topicData[subj.code] && topicData[subj.code][selectedPhase]
    );

    setFilteredSubjects(filtered);
    setSelectedSubjectCode(filtered.length > 0 ? filtered[0].code : "");
  }, [selectedPhase, allSubjects, topicData]);

  // Set topic schedule for selected subject and phase
  useEffect(() => {
    if (selectedSubjectCode && selectedPhase && topicData[selectedSubjectCode]) {
      setTopicSchedule(topicData[selectedSubjectCode][selectedPhase] || []);
    } else {
      setTopicSchedule([]);
    }
  }, [selectedSubjectCode, selectedPhase, topicData]);

  const generateReport = () => {
    if (!selectedTeacher || !selectedSubjectCode || !selectedPhase) {
      alert("Please select teacher, phase, and subject.");
      return;
    }

    const selectedSubject = filteredSubjects.find(
      (s) => s.code === selectedSubjectCode
    );

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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

        <select
          value={selectedPhase}
          onChange={(e) => setSelectedPhase(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select Phase</option>
          {[...new Set(availablePhases)].map((phase, idx) => (
            <option key={idx} value={phase}>
              {phase}
            </option>
          ))}
        </select>

        <select
          value={selectedSubjectCode}
          onChange={(e) => setSelectedSubjectCode(e.target.value)}
          className="border p-2 rounded"
          disabled={filteredSubjects.length === 0}
        >
          <option value="">Select Subject</option>
          {filteredSubjects.map((subj, idx) => (
            <option key={idx} value={subj.code}>
              {subj.name} ({subj.code})
            </option>
          ))}
        </select>

        <button
          onClick={generateReport}
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 w-fit"
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

      {topicSchedule.length > 0 && (
        <div className="bg-white shadow-md p-4 rounded mt-6">
          <h2 className="text-xl font-semibold mb-2 text-blue-700">📘 Topic Schedule - {selectedPhase}</h2>

          <p className="mb-2 text-sm text-gray-700">
            <strong>Total Classes Taken:</strong> {topicSchedule.length}
          </p>

          <table className="table-auto w-full border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Topic</th>
              </tr>
            </thead>
            <tbody>
              {topicSchedule.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="p-2 border">{item.date}</td>
                  <td className="p-2 border">{item.topic}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TeacherWiseReport;
