import React from "react";
import { Outlet } from "react-router-dom";
import NavbarCustom from "../components/Navbar";

const Layout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarCustom />  {/* Navbar is constant */}
      <Outlet />  {/* This is where different pages load */}
    </div>
  );
};

export default Layout;