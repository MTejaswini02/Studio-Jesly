import { Navigate } from "react-router-dom";
import { isClient } from "../utils/auth";


function ClientProtectedRoute({ children }) {

  if (!isClient()) {
    return <Navigate to="/client/login" replace />;
  }

  return children;
}


export default ClientProtectedRoute;