import DashboardStat from "../components/DashboardStat";
import { supabase } from "../lib/supabase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Dashboard() {

  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const { data, error } = await supabase
      .from("students")
      .select("*");

    if (error) {
      console.error(error);
      return;
    }

    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

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

        <button onClick={handleLogout}>
            Logout
        </button>

        <button
            onClick={testConnection}
            className="btn btn-primary mb-3"
            >
            Test Database
        </button>

      <div className="card p-4 mb-4">

        <div className="row mb-4">

            <div className="col-md-4 mb-3">
                <DashboardStat
                    title="Total Students"
                    value={students.length}
                />
                </div>

                <div className="col-md-4 mb-3">
                <DashboardStat
                    title="Courses"
                    value={
                    [...new Set(
                        students.map(student => student.course)
                    )].length
                    }
                />
                </div>

                <div className="col-md-4 mb-3">
                <DashboardStat
                    title="Active Records"
                    value={students.length}
                />
            </div>
          </div>
      </div>
    </div>
  );
}

export default Dashboard;