import { Navigate } from "react-router-dom";
import { isAdmin } from "../utils/auth";

function ProtectedRoute({ children }) {

  if (!isAdmin()) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default ProtectedRoute;