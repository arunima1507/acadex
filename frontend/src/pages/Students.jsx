import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";



function Students() {
    const [students, setStudents] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [course, setCourse] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchStudents = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("students")
            .select("*");

        console.log(data);
        console.log(error);

        if (error) {
            console.error(error);
            setLoading(false);
            return;
        }

        setStudents(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchStudents();
        }, []);

    const handleAddStudent = async () => {

        if (!name || !email || !course) {
            alert("Please fill all fields");
            return;
        }

        if (editingId) {

            console.log("Updating student:", editingId);

            const { error } = await supabase
            .from("students")
            .update({
                name,
                email,
                course,
            })
            .eq("id", editingId);

            console.log(error);

            if (error) {
            console.error(error);
            alert("Failed to update student");
            return;
            }

            fetchStudents();

            setEditingId(null);
        } else {

            const { error } = await supabase
                .from("students")
                .insert([
                    {
                        name,
                        email,
                        course,
                    },
                ]);

            if (error) {
                console.error(error);
                alert(error.message);
                return;
            }

            fetchStudents();
        }

        setName("");
        setEmail("");
        setCourse("");
    };

    const handleDeleteStudent = async (id) => {

        const { error } = await supabase
            .from("students")
            .delete()
            .eq("id", id);

        if (error) {
            console.error(error);
            alert("Failed to delete student");
            return;
        }

        fetchStudents();
    };

    const handleEditStudent = (student) => {
        setName(student.name);
        setEmail(student.email);    
        setCourse(student.course);

        setEditingId(student.id);
    };

    const filteredStudents = students.filter(
    (student) =>
        student.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    if (loading) {
    return (
        <h3 className="text-center mt-5">
        Loading...
        </h3>
    );
    }

  return (
  <div className="container py-5">

    <h1 className="mb-4">
      Student Management
    </h1>

    <div className="card p-4 mb-4">

      <h4>
        {editingId ? "Edit Student" : "Add Student"}
      </h4>

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
        className="btn btn-primary"
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
      <input
            className="form-control mb-3"
            placeholder="Search Student..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />

      {filteredStudents.length === 0 ? (

        <p>No students found.</p>

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

            {filteredStudents.map((student) => (

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

export default Students;