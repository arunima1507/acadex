import { useState } from "react";

function Dashboard() {

  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");

  const handleAddStudent = () => {

    if (!name || !email || !course) {
      alert("Please fill all fields");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name,
      email,
      course,
    };

    setStudents([...students, newStudent]);

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

  return (
    <div className="container py-5">

      <h1 className="mb-4">
        Acadex Dashboard
      </h1>

      <div className="card p-4 mb-4">

        <div className="row mb-4">

            <div className="col-md-4 mb-3">
                <div className="card shadow-sm border-0 p-4">
                <h6>Total Students</h6>
                <h2>{students.length}</h2>
                </div>
            </div>

            <div className="col-md-4 mb-3">
                <div className="card shadow-sm border-0 p-4">
                <h6>Courses</h6>
                <h2>
                    {
                    [...new Set(
                        students.map(student => student.course)
                    )].length
                    }
                </h2>
                </div>
            </div>

            <div className="col-md-4 mb-3">
                <div className="card shadow-sm border-0 p-4">
                <h6>Active Records</h6>
                <h2>{students.length}</h2>
                </div>
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
          Add Student
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