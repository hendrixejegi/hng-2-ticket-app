import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { router } from "./app/routes";
import { RouterProvider } from "react-router";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
