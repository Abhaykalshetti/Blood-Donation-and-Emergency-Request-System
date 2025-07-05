import React from "react";
import { Navigate } from "react-router-dom";

// ProtectedRoute component
const ProtectedRoute = ({ children, allowedRoles }) => {
  // Retrieve the token and user role from localStorage
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // If there's no token (user not logged in), redirect to the login page
  if (!token) {
    return <Navigate to="/" />;
  }

  // If the user role is not in the allowedRoles, redirect to a forbidden page or a different route
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/register" />;
  }

  // If everything is okay, render the children (which is the protected component)
  return children;
};

export default ProtectedRoute;
