function DashboardStat({ title, value }) {
  return (
    <div className="card shadow-sm border-0 p-4">
      <h6>{title}</h6>
      <h2>{value}</h2>
    </div>
  );
}

export default DashboardStat;