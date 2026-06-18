import DashboardStat from "../components/DashboardStat";
import { supabase } from "../lib/supabase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchStudents = async () => {
    const { data, error } = await supabase
        .from("students")
        .select("*");

    console.log(data);
    console.log(error);

    if (error) {
        console.error(error);
        return;
    }

    setStudents(data);
    };

  useEffect(() => {
    fetchStudents();
    }, []);

  const handleAddStudent = () => {

    if (!name || !email || !course) {
        alert("Please fill all fields");
        return;
    }

    if (editingId) {

        const updatedStudents = students.map((student) =>
        student.id === editingId
            ? {
                ...student,
                name,
                email,
                course,
            }
            : student
        );

        setStudents(updatedStudents);

        setEditingId(null);

    } else {

        const newStudent = {
        id: Date.now(),
        name,
        email,
        course,
        };

        setStudents([...students, newStudent]);

    }

    setName("");
    setEmail("");
    setCourse("");
    };

  const handleDeleteStudent = (id) => {
    const updatedStudents = students.filter(
        (student) => student.id !== id
    );

    setStudents(updatedStudents);
};
    const handleEditStudent = (student) => {
    setName(student.name);
    setEmail(student.email);    
    setCourse(student.course);

    setEditingId(student.id);
    };

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

        <h4>Add Student</h4>

        <input
          className="form-control mb-3"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="form-control mb-3"
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />

        <button
            className="btn accent-btn"
            onClick={handleAddStudent}
            >
            {editingId ? "Update Student" : "Add Student"}
        </button>

      </div>

      <div className="card p-4">

        <h4>
          Total Students: {students.length}
        </h4>

        <hr />

        {students.length === 0 ? (
          <p>No students added yet.</p>
        ) : (
          <table className="table table-hover">
            <thead>
                <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Actions</th>
                </tr>
            </thead>

            <tbody>

                {students.map((student) => (

                <tr key={student.id}>

                    <td>{student.name}</td>

                    <td>{student.email}</td>

                    <td>{student.course}</td>

                    <td>

                    <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEditStudent(student)}
                        >
                        Edit
                    </button>

                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                        handleDeleteStudent(student.id)
                        }
                    >
                        Delete
                    </button>

                    </td>

                </tr>

                ))}

            </tbody>

            </table>
        )}

      </div>

    </div>
  );
}

export default Dashboard;