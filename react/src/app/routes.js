import { createBrowserRouter } from "react-router";
import MarketingRoot from "./marketing/MarketingRoot";
import Home from "./marketing/Home";
import Register from "./authentication/Register";
import Login from "./authentication/Login";
import DashboardLayout from "./dashboard/DashboardLayout";
import DashboardSummary from "./dashboard/DashboardSummary";
import TicketManagement from "./dashboard/TicketManagement";
import getUser from "../actions/getUser";
import getTickets from "../actions/getTickets";

const getSession = () =>
  JSON.parse(sessionStorage.getItem("ticket-app-session"));

const loadTickets = async () => {
  const session = getSession();
  if (session === null) {
    return { ticketData: null };
  }

  const { token } = session;
  return { ticketsData: await getTickets(token) };
};

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MarketingRoot,
    children: [{ index: true, Component: Home }],
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/dashboard",
    loader: async () => {
      const session = getSession();
      if (session === null) {
        return { user: null };
      }
      const { userId, token } = session;
      return { user: await getUser(userId, token) };
    },
    Component: DashboardLayout,
    children: [
      { index: true, loader: loadTickets, Component: DashboardSummary },
      {
        path: "/dashboard/tickets",
        loader: loadTickets,
        Component: TicketManagement,
      },
    ],
  },
]);
