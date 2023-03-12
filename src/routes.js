import { Navigate, useRoutes } from "react-router-dom";
import Admin from "./components/pages/Admin";
import Home from "./components/pages/Home";
// layouts

// ----------------------------------------------------------------------
export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <Home />,
      children: [
        { element: <Navigate to="/" replace /> },
        { path: "", element: <Home /> },
      ],
    },
    {
      path: "/connect",
      element: <Admin />,
      children: [
        { element: <Navigate to="/" replace /> },
        { path: "", element: <Home /> },
      ],
    },
    { path: "*", element: <Navigate to="/" replace /> },
  ]);
}
