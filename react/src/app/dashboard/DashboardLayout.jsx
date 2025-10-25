import { NavLink } from "react-router";
import Logo from "../../components/Logo";
import { FaChartPie, FaTicket } from "react-icons/fa6";
import { cn } from "../../utils/cn";

export default function DashboardLayout({ children }) {
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
          <button className="border-error text-error cursor-pointer rounded-lg border-2 px-4 py-2.5 font-semibold">
            Log Out
          </button>
        </aside>
        <main>
          <header className="bg-surface rounded-lg p-4">
            <div className="ml-auto flex w-fit items-center gap-4">
              <div>
                <p className="font-semibold">Hendrix Ejegi</p>
                <p className="text-right text-sm">Administrator</p>
              </div>
              <div className="bg-accent text-surface flex size-12 items-center justify-center rounded-full text-lg font-semibold">
                HE
              </div>
            </div>
          </header>
          {children}
        </main>
      </div>
    </div>
  );
}
