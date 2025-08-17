import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((store) => store.user); // from userSlice

  if (!user) {
    // if not logged in, redirect to Signin
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
