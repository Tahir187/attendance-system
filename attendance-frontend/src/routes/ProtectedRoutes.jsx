import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, roles, ...rest }) => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!roles.includes(user.role[0])) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Component {...rest} />;

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     navigate('/login', { replace: true });
  //   }
  //   // No return needed here as the logic is only for side effects
  // }, [isLoggedIn]);

  // return (
  //   roles && roles.includes(user.role) ? <Component {...rest} /> : <Navigate to="/" replace />
  // );
};

export default ProtectedRoute;
