import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

//import pages
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import HomePage from "./pages/HomePage.tsx";
import MealPage from "./pages/MealPage.tsx";
import AnalyticsPage from "./pages/AnalyticsPage.tsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";

import { ErrorBoundary } from "react-error-boundary";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <ErrorBoundary
        fallback={
          <p className="p-4">
            Something went wrong! Try refreshing the Page...
          </p>
        }
      >
        <HomePage />
      </ErrorBoundary>
    ),
  },
  {
    path: "/meal",
    element: <MealPage />,
  },
  {
    path: "/analytics",
    element: <AnalyticsPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>
);
