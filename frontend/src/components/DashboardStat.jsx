function DashboardStat({ title, value }) {
  return (
    <div className="card shadow-sm border-0 p-4">
      <h5 className="text-nowrap">
        {title}
      </h5>

      <h2 className="text-nowrap">
        {value}
      </h2>
    </div>
  );
}

export default DashboardStat;