import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

function Assignments() {

  const [assignments, setAssignments] = useState([]);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchAssignments = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("assignments")
      .select("*");

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    setAssignments(data);
    setLoading(false);
  };

  const handleSaveAssignment = async () => {

    if (!title || !subject || !dueDate || !status) {
      alert("Please fill all fields");
      return;
    }

    if (editingId) {

      const { error } = await supabase
        .from("assignments")
        .update({
          title,
          subject,
          due_date: dueDate,
          status,
        })
        .eq("id", editingId);

      if (error) {
        console.error(error);
        alert("Failed to update assignment");
        return;
      }

      setEditingId(null);

    } else {

      const { error } = await supabase
        .from("assignments")
        .insert([
          {
            title,
            subject,
            due_date: dueDate,
            status,
          },
        ]);

      if (error) {
        console.error(error);
        alert("Failed to add assignment");
        return;
      }

    }

    fetchAssignments();

    setTitle("");
    setSubject("");
    setDueDate("");
    setStatus("");
  };

  const handleDeleteAssignment = async (id) => {

    const { error } = await supabase
      .from("assignments")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Failed to delete assignment");
      return;
    }

    fetchAssignments();
  };

  const handleEditAssignment = (assignment) => {
    setTitle(assignment.title);
    setSubject(assignment.subject);
    setDueDate(assignment.due_date);
    setStatus(assignment.status);

    setEditingId(assignment.id);
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const filteredAssignments = assignments.filter(
    (assignment) => {

      const matchesSearch =
        assignment.title
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesStatus =
        statusFilter === ""
          ? true
          : assignment.status === statusFilter;

      return matchesSearch && matchesStatus;
    }
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
        Assignment Management
      </h1>

      <div className="card p-4 mb-4">

        <h4>
          {editingId ? "Edit Assignment" : "Add Assignment"}
        </h4>

        <input
          className="form-control mb-3"
          placeholder="Assignment Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="form-control mb-3"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <input
          type="date"
          className="form-control mb-3"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <select
          className="form-control mb-3"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <button
          className="btn btn-primary"
          onClick={handleSaveAssignment}
        >
          {editingId ? "Update Assignment" : "Add Assignment"}
        </button>

      </div>

      <div className="card p-4">

        <h4>
          Total Assignments: {assignments.length}
        </h4>

        <hr />

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search Assignment..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />

        <select
          className="form-control mb-3"
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option value="">
            All Status
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="Completed">
            Completed
          </option>
        </select>

        {filteredAssignments.length === 0 ? (

          <p>No assignments found.</p>

        ) : (

          <table className="table table-hover">

            <thead>
              <tr>
                <th>Title</th>
                <th>Subject</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredAssignments.map((assignment) => (

                <tr key={assignment.id}>

                  <td>{assignment.title}</td>
                  <td>{assignment.subject}</td>
                  <td>{assignment.due_date}</td>
                  <td>{assignment.status}</td>

                  <td>

                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() =>
                        handleEditAssignment(assignment)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        handleDeleteAssignment(assignment.id)
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

export default Assignments;