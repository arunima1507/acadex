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
          students.map((student) => (
            <div
              key={student.id}
              className="border rounded p-3 mb-3"
            >
              <h5>{student.name}</h5>

              <p>{student.email}</p>

              <p>{student.course}</p>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDeleteStudent(student.id)}
              >

                Delete
                
              </button>
            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default Dashboard;