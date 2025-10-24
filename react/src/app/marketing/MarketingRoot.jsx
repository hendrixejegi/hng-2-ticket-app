import React from "react";
import { Outlet } from "react-router";
import NavBar from "../../components/NavBar";
import "./Root.css";
import Footer from "../../components/Footer";

export default function MarketingRoot() {
  return (
    <div className="bg-background">
      <NavBar />
      <main className="wrapper text-text">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
