import { createBrowserRouter } from "react-router";
import MarketingRoot from "./marketing/MarketingRoot";
import Home from "./marketing/home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MarketingRoot,
    children: [{ index: true, Component: Home }],
  },
]);
