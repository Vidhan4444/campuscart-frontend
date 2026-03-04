import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function ProtectedRoute({ children, adminOnly = false }) {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return <p>Checking session...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/shop" replace />;
  }

  return children;
}

export default ProtectedRoute;
