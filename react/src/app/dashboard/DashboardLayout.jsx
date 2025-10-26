import { useState, useEffect, useCallback } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import Logo from "../../components/Logo";
import { FaChartPie, FaTicket } from "react-icons/fa6";
import { cn, capFirstLetter, getSession } from "../../utils";
import "./DashboardLayout.css";
import getUser from "../../actions/getUser";

export default function DashboardLayout() {
  const [session, setSession] = useState(getSession());
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // Guard: User is not authenticated
  useEffect(() => {
    if (session === null) {
      navigate("/login");
      return;
    }
  }, [navigate, session]);

  const { userId, token } = session;

  // Fetch user info
  useEffect(() => {
    getUser(userId, token).then((res) => setUser(res));
  }, [userId, token]);

  const handleLogOut = useCallback(() => {
    sessionStorage.removeItem("ticket-app-token");
    setSession(null);
    navigate("/");
  }, [navigate]);

  const getName = (field) => (user ? user[field] : "");

  const firstName = getName("first_name");
  const lastName = getName("last_name");
  const userName = firstName + " " + lastName;
  const userInitials = capFirstLetter(firstName) + capFirstLetter(lastName);

  return (
    <div className="wrapper bg-background font-dm text-text h-screen">
      <div className="dashboard">
        <aside className="bg-surface dashboard_sidebar flex h-full flex-col justify-between rounded-lg p-4">
          <div className="space-y-8">
            <Logo />
            <div>
              <h2 className="text mb-2 px-4 py-2.5 font-bold">Menu</h2>
              <nav aria-label="Dashboard navigation">
                <ul>
                  <li>
                    <NavLink
                      to="/dashboard"
                      end
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-2 rounded-lg px-4 py-2.5",
                          isActive &&
                            "bg-primary text-surface outline-primary font-semibold",
                        )
                      }
                    >
                      <FaChartPie aria-hidden="true" />
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/tickets"
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-2 rounded-lg px-4 py-2.5",
                          isActive &&
                            "bg-primary text-surface outline-primary font-semibold",
                        )
                      }
                    >
                      <FaTicket aria-hidden="true" />
                      Tickets
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <button
            className="border-error text-error cursor-pointer rounded-lg border-2 px-4 py-2.5 font-semibold"
            onClick={handleLogOut}
          >
            Log Out
          </button>
        </aside>
        <header className="dashboard_header bg-surface mb-4 rounded-lg p-4">
          <div className="ml-auto flex w-fit items-center gap-4">
            <div>
              <p className="text-right font-semibold">{userName}</p>
              <p className="text-right text-sm">Administrator</p>
            </div>
            <div className="bg-accent text-surface flex size-12 items-center justify-center rounded-full text-lg font-semibold">
              {userInitials}
            </div>
          </div>
        </header>
        <main className="dashboard_main bg-surface flex h-full grow flex-col rounded-lg p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
