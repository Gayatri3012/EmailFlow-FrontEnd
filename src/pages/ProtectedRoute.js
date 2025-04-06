import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isTokenExpired } from "../utils/isTokenExpired";
import { logout } from "../store/authSlice";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const token = localStorage.getItem("token");


  // If token exists and is expired
  let hasShownToast = false;
  if (token && isTokenExpired(token)) {
    dispatch(logout()); // Clear auth state
    if (!hasShownToast) {
      toast.info("Session expired. Please log in again.");
      hasShownToast = true;
    }
    return <Navigate to="/login" replace />;  // Redirect to login
  }

// If authenticated, render the protected component; else, redirect to login
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;