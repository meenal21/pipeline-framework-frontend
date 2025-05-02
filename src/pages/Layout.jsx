import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavbarCustom from "../components/Navbar";
import setupInterceptors from "../utils/axiosInterceptors";

const Layout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setupInterceptors(navigate); // Hook in interceptors with navigate
  }, [navigate]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarCustom />
      <Outlet />
    </div>
  );
};

export default Layout;
