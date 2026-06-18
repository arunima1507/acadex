import { Navigate } from "react-router-dom";

function ProtectedRoute({ session, children }) {
  if (!session) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;