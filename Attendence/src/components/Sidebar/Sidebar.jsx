import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const navLinkStyle = ({ isActive }) =>
    `block w-full text-left px-6 py-2 rounded-md text-white text-lg font-medium hover:bg-blue-800 transition ${
      isActive ? "bg-blue-700 font-bold" : ""
    }`;

  return (
    <div className="w-64 min-h-screen bg-[#0a3161] text-white flex flex-col items-center py-6">
      <img
        src="https://randomuser.me/api/portraits/men/75.jpg"
        alt="Profile"
        className="w-24 h-24 rounded-full object-cover mb-4"
      />
      <h2 className="text-xl font-semibold mb-8">John Doe</h2>

      <div className="space-y-3 w-full px-4">
        <NavLink to="/admin/complete-report" className={navLinkStyle}>
          📊 Complete Report
        </NavLink>

        <NavLink to="/admin/attendance" className={navLinkStyle}>
          📝 Attendance
        </NavLink>

        <NavLink to="/admin/marks" className={navLinkStyle}>
          🧮 Marks
        </NavLink>

        <NavLink to="/admin/subject-wise" className={navLinkStyle}>
          📚 Subject Wise
        </NavLink>

        <NavLink to="/admin/year-wise" className={navLinkStyle}>
          📅 Year Wise
        </NavLink>

        <NavLink to="/admin/month-wise" className={navLinkStyle}>
          📅 Date Wise
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
