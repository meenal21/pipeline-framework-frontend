import React from "react";
import { Outlet } from "react-router-dom";
import NavbarCustom from "../components/Navbar";

const Layout = () => {
  return (
    <>
      <NavbarCustom />  {/* Navbar is constant */}
      <Outlet />  {/* This is where different pages load */}
    </>
  );
};

export default Layout;