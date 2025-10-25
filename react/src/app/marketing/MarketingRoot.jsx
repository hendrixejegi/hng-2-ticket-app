import { Outlet } from "react-router";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import "./MarketingRoot.css";

export default function MarketingRoot() {
  return (
    <div className="bg-background marketing">
      <NavBar />
      <main className="wrapper text-text">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
