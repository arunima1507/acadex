function Analytics() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [assignments, setAssignments] = useState([]);
  
  const fetchAnalytics = async () => {

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
    fetchAnalytics();
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

  const completedAssignments =
    assignments.filter(
      assignment => assignment.status === "Completed"
    ).length;

  const pendingAssignments =
    assignments.filter(
      assignment => assignment.status === "Pending"
    ).length;

  return (
    <div className="container py-5">

      <h1 className="mb-4">
        Analytics Dashboard
      </h1>

      <div className="card p-4 mb-4">

        <h4>
          Total Students: {students.length}
        </h4>

        <h4>
          Total Attendance Records: {attendance.length}
        </h4>

        <h4>
          Total Assignments: {assignments.length}
        </h4>

        <hr />

        <h4>
          Attendance Rate: {attendanceRate}%
        </h4>

        <hr />

        <h4>
          Assignments Completed:
          {" "}
          {completedAssignments}
        </h4>

        <h4>
          Assignments Pending:
          {" "}
          {pendingAssignments}
        </h4>

      </div>

    </div>
  );
}

export default Analytics;