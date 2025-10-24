import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "./home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [{ index: true, Component: Home }],
  },
]);
