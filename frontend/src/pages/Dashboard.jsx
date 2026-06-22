import DashboardStat from "../components/DashboardStat";
import { supabase } from "../lib/supabase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Dashboard() {

  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const fetchDashboardData = async () => {

    const { data: studentsData } =
      await supabase
        .from("students")
        .select("*");

    const { data: attendanceData } =
      await supabase
        .from("attendance")
        .select("*");

    const { data: assignmentsData } =
      await supabase
        .from("assignments")
        .select("*");

    setStudents(studentsData || []);
    setAttendance(attendanceData || []);
    setAssignments(assignmentsData || []);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const presentCount = attendance.filter(
    record => record.status === "Present"
  ).length;

  const attendanceRate =
    attendance.length > 0
      ? (
          (presentCount / attendance.length) * 100
        ).toFixed(1)
      : 0;


  const testConnection = async () => {

    const { data, error } = await supabase.from("students").select("*");

    console.log(data);
    console.log(error);

  };
    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/login");
    };

  return (
    <div className="container py-5">
        
      <h1 className="mb-4">
        Acadex Dashboard
      </h1>

        <button
          onClick={handleLogout}
          className="btn btn-danger mb-4"
        >
          Logout
        </button>

      <div className="card p-4 mb-4">

        <div className="row">

          <div className="col-lg-3 col-md-6 mb-3">
            <DashboardStat
              title="Students"
              value={students.length}
            />
          </div>

          <div className="col-lg-3 col-md-6 mb-3">
            <DashboardStat
              title="Attendance"
              value={attendance.length}
            />
          </div>

          <div className="col-lg-3 col-md-6 mb-3">
            <DashboardStat
              title="Assignments"
              value={assignments.length}
            />
          </div>

          <div className="col-lg-3 col-md-6 mb-3">
            <DashboardStat
              title="Attendance"
              value={`${attendanceRate}%`}
            />
          </div>
        </div>
      </div>
      <div className="card p-4">
          <h3>
            Welcome to Acadex
          </h3>

          <p>
            Manage students, attendance,
            assignments and analytics
            from a single dashboard.
          </p>

      </div>
    </div>
  );
}

export default Dashboard;