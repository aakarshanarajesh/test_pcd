import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="app-nav">
      <NavLink to="/" className="nav-link">Home</NavLink>
      <NavLink to="/filter" className="nav-link">Filter</NavLink>
      <NavLink to="/orders" className="nav-link">Orders</NavLink>
      <NavLink to="/stats" className="nav-link">Stats</NavLink>
    </nav>
  );
};

export default NavBar;
