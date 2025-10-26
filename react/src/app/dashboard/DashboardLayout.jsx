import { useEffect, useState, useCallback } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import Logo from "../../components/Logo";
import { FaChartPie, FaTicket } from "react-icons/fa6";
import { cn, capFirstLetter } from "../../utils";
import getUser from "../../actions/getUser";

export default function DashboardLayout() {
  const [sessionData, setSessionData] = useState(() => {
    const data = JSON.parse(sessionStorage.getItem("ticket-app-session"));
    if (!data) {
      return {
        userId: null,
        token: null,
      };
    }

    return data;
  });

  const { userId, token } = sessionData;

  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // Guard: User is not authenticated
  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }
  }, [navigate, userId]);

  const handleLogOut = useCallback(() => {
    sessionStorage.removeItem("ticket-app-token");
    setSessionData({
      userId: null,
      token: null,
    });
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    if (!(userId || token)) {
      return;
    }
    getUser(userId, token).then((res) => setUser(res));
  }, [userId, token]);

  const getName = (field) => (user ? user[field] : "");

  const firstName = getName("first_name");
  const lastName = getName("last_name");
  const userName = firstName + " " + lastName;
  const userInitials = capFirstLetter(firstName) + capFirstLetter(lastName);

  return (
    <div className="wrapper bg-background font-dm text-text min-h-screen p-4">
      <div className="grid grid-cols-[280px_1fr] gap-4">
        <aside className="bg-surface flex flex-col justify-between rounded-lg p-4">
          <div className="space-y-8">
            <Logo />
            <div>
              <h2 className="text mb-2 px-4 py-2.5 font-bold">Menu</h2>
              <nav aria-label="Dashboard navigation">
                <ul>
                  <li>
                    <NavLink
                      to="/dashboard"
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
                      to="/tickets"
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
        <main className="flex flex-col gap-4">
          <header className="bg-surface rounded-lg p-4">
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
          <div className="bg-surface grow rounded-lg p-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
