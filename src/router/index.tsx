import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/Home";
import Adopt from "../pages/Adopt";
import PetDetails from "../pages/PetDetails";
import Auth from "../pages/Auth";
import ReportStray from "../pages/ReportStray";
import Dashboard from "../pages/Dashboard";
import About from "../pages/About";
import HowToHelp from "../pages/HowToHelp";
import StrayGuide from "../pages/StrayGuide";
import Sponsor from "../pages/Sponsor";
import Contact from "../pages/Contact";
import Donate from "../pages/Donate";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/adopt", element: <Adopt /> },
      { path: "/adopt/:id", element: <PetDetails /> },
      { path: "/auth", element: <Auth /> },
      { path: "/about", element: <About /> },
      { path: "/how-to-help", element: <HowToHelp /> },
      { path: "/stray-guide", element: <StrayGuide /> },
      { path: "/sponsor", element: <Sponsor /> },
      { path: "/contact", element: <Contact /> },
      { path: "/donate", element: <Donate /> },
      { path: "/dashboard", element: <Dashboard /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/report", element: <ReportStray /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
