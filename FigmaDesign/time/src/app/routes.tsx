import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { KitchenTimer } from "./components/KitchenTimer";
import { ExpiryTracker } from "./components/ExpiryCard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: KitchenTimer },
      { path: "freshness", Component: ExpiryTracker },
    ],
  },
]);
