import { createBrowserRouter } from "react-router";
import MarketingRoot from "./marketing/MarketingRoot";
import Home from "./marketing/Home";
import Register from "./authentication/Register";
import Login from "./authentication/Login";
import DashboardLayout from "./dashboard/DashboardLayout";
import DashboardSummary from "./dashboard/DashboardSummary";
import TicketManagement from "./dashboard/TicketManagement";
import getUser from "../actions/getUser";

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
      const session = JSON.parse(sessionStorage.getItem("ticket-app-session"));
      if (session === null) {
        return { user: null };
      }
      const { userId, token } = session;
      console.log({ userId, token });
      return { user: await getUser(userId, token) };
    },
    Component: DashboardLayout,
    children: [
      { index: true, Component: DashboardSummary },
      { path: "/dashboard/tickets", Component: TicketManagement },
    ],
  },
]);
