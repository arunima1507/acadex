import Sidebar from "./Sidebar";

function DashboardLayout({ children }) {
  return (
    <>
      <Sidebar />

      <div
        style={{
          marginLeft: "260px",
          padding: "2rem",
          minHeight: "100vh",
          width: "calc(100% - 260px)",
        }}
      >
        {children}
      </div>
    </>
  );
}

export default DashboardLayout;