import { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate, Link } from "react-router";
import Logo from "../../components/Logo";
import { FaChartPie, FaTicket } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { cn, getSession } from "../../utils";
import "./DashboardLayout.css";
import UserInfo from "../../components/UserInfo";

export default function DashboardLayout() {
  const [session, setSession] = useState(getSession());

  const [showMobileNav, setShowMobileNav] = useState(false);

  const navigate = useNavigate();

  // Guard: User is not authenticated
  useEffect(() => {
    if (session === null) {
      sessionStorage.removeItem("ticket-app-session");
      navigate("/");
      return;
    }
  }, [navigate, session]);

  const handleLogOut = () => {
    setSession(null);
  };

  return (
    <div className="wrapper bg-background font-dm text-text h-screen">
      <div className="dashboard">
        <aside className="bg-surface dashboard_sidebar hidden h-full flex-col justify-between rounded-lg p-4 md:flex">
          <div className="space-y-8">
            <div className="mx-auto w-fit lg:w-full">
              <Link to="/">
                <span className="hidden lg:inline">
                  <Logo />
                </span>
                <span
                  className="font-dm text-primary inline text-2xl font-semibold lg:hidden"
                  aria-label="Queue up logo"
                >
                  Q
                </span>
              </Link>
            </div>

            <div>
              <h2 className="text mb-2 hidden px-4 py-2.5 font-bold lg:block">
                Menu
              </h2>
              <nav aria-label="Dashboard navigation">
                <ul>
                  <li>
                    <NavLink
                      to="/dashboard"
                      end
                      className={({ isActive }) =>
                        cn(
                          "lg:mx-0lg:w-full mx-auto flex w-fit items-center justify-center gap-2 rounded-full p-3 lg:w-full lg:justify-start lg:rounded-lg lg:px-4 lg:py-2.5",
                          isActive &&
                            "bg-primary text-surface outline-primary font-semibold",
                        )
                      }
                      aria-label="Go to summary"
                    >
                      <FaChartPie aria-hidden="true" />
                      <span className="hidden lg:inline">Dashboard</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/tickets"
                      className={({ isActive }) =>
                        cn(
                          "mx-auto flex w-fit items-center justify-center gap-2 rounded-full p-3 lg:mx-0 lg:w-full lg:justify-start lg:rounded-lg lg:px-4 lg:py-2.5",
                          isActive &&
                            "bg-primary text-surface outline-primary font-semibold",
                        )
                      }
                      aria-label="Go to ticket management"
                    >
                      <FaTicket aria-hidden="true" />
                      <span className="hidden lg:inline">Tickets</span>
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <button
            className="border-error text-error flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 p-3 font-semibold lg:px-4 lg:py-2.5"
            onClick={handleLogOut}
            aria-label="Log out"
          >
            <BiLogOut aria-hidden="true" className="text-xl" />
            <span className="hidden lg:inline">Log Out</span>
          </button>
        </aside>
        <header className="dashboard_header bg-surface mb-4 flex items-center rounded-lg p-4 md:mb-0">
          <button
            aria-label={`${showMobileNav ? "Close" : "Open"} navigation toggle`}
            aria-controls="mobile-nav-container"
            aria-expanded={showMobileNav}
            onClick={() => setShowMobileNav((prev) => !prev)}
            className="isolate z-60 md:hidden"
          >
            {showMobileNav ? (
              <FaTimes aria-hidden="true" className="text-2xl" />
            ) : (
              <GiHamburgerMenu aria-hidden="true" className="text-xl" />
            )}
          </button>
          <div
            id="mobile-nav-container"
            aria-live="polite"
            className={cn(
              "bg-surface fixed inset-0 z-50 items-center justify-center md:hidden",
              showMobileNav ? "flex" : "hidden",
            )}
          >
            <div className="flex flex-col items-center gap-4">
              <Link to="/">
                <Logo />
              </Link>
              <nav aria-label="Mobile dashboard navigation">
                <ul>
                  <li>
                    <NavLink
                      to="/dashboard"
                      end
                      className={({ isActive }) =>
                        cn(
                          "inline-block w-full px-4 py-3 text-center text-lg",
                          isActive ? "text-primary" : null,
                        )
                      }
                      onClick={() => setShowMobileNav(false)}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/tickets"
                      className={({ isActive }) =>
                        cn(
                          "inline-block w-full px-4 py-3 text-center text-lg",
                          isActive ? "text-primary" : null,
                        )
                      }
                      onClick={() => setShowMobileNav(false)}
                    >
                      Tickets
                    </NavLink>
                  </li>
                </ul>
              </nav>
              <button
                className="text-error flex items-center justify-center gap-2 rounded-lg px-4 py-3 font-semibold"
                onClick={handleLogOut}
                aria-label="Log out"
              >
                Log Out
              </button>
            </div>
          </div>
          <UserInfo session={session} />
        </header>
        <main className="dashboard_main bg-surface flex h-full grow flex-col rounded-lg p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
