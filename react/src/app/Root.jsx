import React from "react";
import { Outlet } from "react-router";
import "./Root.css";

export default function Root() {
  return (
    <div className="wrapper">
      <Outlet />
    </div>
  );
}
