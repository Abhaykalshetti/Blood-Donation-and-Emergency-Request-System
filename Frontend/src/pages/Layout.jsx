import React from "react";
import { useLocation } from "react-router-dom";
import DonorNavbar from "./donor/DonorNavbar";
import OrganizationNavbar from "./organization/OrganizationNavbar";
import AdminNavbar from "./admin/AdminNavbar";

const Layout = ({ children }) => {
  const location = useLocation();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Pages that shouldn't show any navbar
  const hideNavbarRoutes = ["/", "/register"];

  if (hideNavbarRoutes.includes(location.pathname)) {
    return <>{children}</>;
  }

  return (
    <>
      {token && role === "donor" && <DonorNavbar />}
      {token && role === "admin" && <AdminNavbar />}
      {token && role === "organization" && <OrganizationNavbar />}
      {children}
    </>
  );
};

export default Layout;
