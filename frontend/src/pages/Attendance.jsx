import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");

  const fetchAttendance = async () => {
    const { data, error } = await supabase
      .from("attendance")
      .select(`
        *,
        students (
          name
        )
    `);

    if (error) {
      console.error(error);
      return;
    }

    setAttendance(data);
  };

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

  const handleSaveAttendance = async () => {

    if (!studentId || !date || !status) {
      alert("Please fill all fields");
      return;
    }

    const { error } = await supabase
      .from("attendance")
      .insert([
        {
          student_id: studentId,
          date,
          status,
        },
      ]);

    if (error) {
      console.error(error);
      alert("Failed to save attendance");
      return;
    }

    alert("Attendance saved!");

    fetchAttendance();

    setStudentId("");
    setDate("");
    setStatus("");
  };

  useEffect(() => {
    fetchAttendance();
    fetchStudents();
  }, []);

  return (
    <div className="container py-5">

      <h1 className="mb-4">
        Attendance Management
      </h1>

      <div className="card p-4 mb-4">

        <h4>Mark Attendance</h4>

        <select
          className="form-control mb-3"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        >
          <option value="">
            Select Student
          </option>

          {students.map((student) => (
            <option
              key={student.id}
              value={student.id}
            >
              {student.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="form-control mb-3"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <select
          className="form-control mb-3"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">
            Select Status
          </option>

          <option value="Present">
            Present
          </option>

          <option value="Absent">
            Absent
          </option>
        </select>

        <button className="btn btn-primary" onClick={handleSaveAttendance}>
          Save Attendance
        </button>

      </div>

      <div className="card p-4">

      <h4>
        Total Records: {attendance.length}
      </h4>

      <hr />

      {attendance.length === 0 ? (

        <p>No attendance records found.</p>

      ) : (

        <table className="table table-hover">

          <thead>
            <tr>
              <th>Student Name</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {attendance.map((record) => (

              <tr key={record.id}>

                <td>{record.students?.name || 'N/A'}</td>

                <td>{new Date(record.date).toLocaleDateString('en-GB')}</td>

                <td>{record.status}</td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>

    </div>
  );
}

export default Attendance;