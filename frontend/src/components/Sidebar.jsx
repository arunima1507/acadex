import { Link } from "react-router-dom";

import {
  FaHome,
  FaUserGraduate,
  FaClipboardCheck,
  FaBook,
  FaChartBar,
} from "react-icons/fa";


function Sidebar() {
  return (
    <div className="sidebar">

      <h2 className="sidebar-logo">
        Acadex
      </h2>

      <ul className="sidebar-menu">

        <li>
          <Link to="/dashboard">
            <FaHome />
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/students">
            <FaUserGraduate />
            Students
          </Link>
        </li>

        <li>
          <Link to="/attendance">
            <FaClipboardCheck />
            Attendance
          </Link>
        </li>

        <li>
          <Link to="/assignments">
            <FaBook />
            Assignments
          </Link>
        </li>

        <li>
          <Link to="/analytics">
            <FaChartBar />
            Analytics
          </Link>
        </li>

      </ul>

    </div>
  );
}

export default Sidebar;