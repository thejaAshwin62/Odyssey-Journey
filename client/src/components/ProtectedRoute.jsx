import { useDashboardContext } from "../pages/DashboardLayout";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roles }) => {
  const { user } = useDashboardContext();
  if (!roles.includes(user.role)) {
    return <Navigate to="/dashboard" />;
  }
  return children;
};

export default ProtectedRoute;
