import { createBrowserRouter } from "react-router";
import MarketingRoot from "./marketing/MarketingRoot";
import Home from "./marketing/Home";
import Register from "./authentication/Register";
import Login from "./authentication/Login";
import DashboardLayout from "./dashboard/DashboardLayout";
import DashboardSummary from "./dashboard/DashboardSummary";

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
    Component: DashboardLayout,
    children: [{ index: true, Component: DashboardSummary }],
  },
]);
