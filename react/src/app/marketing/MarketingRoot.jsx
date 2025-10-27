import { useState } from "react";
import { Outlet } from "react-router";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import "./MarketingRoot.css";
import { getSession } from "../../utils";

export default function MarketingRoot() {
  const [session, setSession] = useState(getSession());
  const clearSession = () => {
    localStorage.removeItem("ticketapp_session");
    setSession(null);
  };
  return (
    <div className="bg-background marketing">
      <NavBar session={session} logout={() => clearSession()} />
      <main className="wrapper text-text">
        <Outlet context={{ session }} />
      </main>
      <Footer />
    </div>
  );
}
