import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, roles, ...rest }) => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!roles.includes(user.role[0])) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
