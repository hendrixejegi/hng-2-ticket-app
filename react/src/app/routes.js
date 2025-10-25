import { createBrowserRouter } from "react-router";
import MarketingRoot from "./marketing/MarketingRoot";
import Home from "./marketing/home/Home";
import Register from "./authentication/Register";
import Login from "./authentication/Login";

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
]);
