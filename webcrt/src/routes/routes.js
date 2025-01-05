import React, { useEffect } from "react";
import { createBrowserRouter, useLocation } from "react-router-dom";
import  DashboardLayout  from "../layouts/dashboards/DashboardLayout.js";
import RegionDashboardPage from "../pages/region/RegionDashboardPage.js";
import  ZonalDashboard  from "../pages/zonal/ZonalDashboard.js";
import BranchList from "../pages/BranchMaster/BranchList.js";
import BranchCreation from "../pages/BranchMaster/BranchCreation.js";
import HomePage from "../pages/HomePage.js";
import ErrorPage from "../pages/errors/Error.js";
import Error400Page from "../pages/errors/Error400.js";
import Login from "../pages/Login.js";
import  LogisticsDashboardPage  from "../pages/logistics/LogisticsDashboardPage.js";
import ChartsDashboard from "../pages/logistics/ChartsDashboard.js";

// Custom scroll restoration function
export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    }); // Scroll to the top when the location changes
  }, [pathname]);

  return null; // This component doesn't render anything
};

// Create an HOC to wrap your route components with ScrollToTop
const PageWrapper = ({ children }) => {
  return (
    <>
      <ScrollToTop />
      {children}
    </>
  );
};

// Create the router
const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Login />,
      },
    ],
  },
  {
    path: '/',
    element: <PageWrapper children={<DashboardLayout />} />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'home',
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/masters",
    element: <PageWrapper children={<DashboardLayout />} />,
    errorElement: <Error400Page />,
    children: [
      {
        path: "region",
        element: <RegionDashboardPage />,
      },
      {
        path: "zone",
        element: <ZonalDashboard />,
      },
      {
        path: "branch-list",
        element: <BranchList />,
      },
      {
        path: "logistics",
        element: <LogisticsDashboardPage />,
      },
      {
        path: "charts",
        element: <ChartsDashboard />,
      },
      {
        path: "create-branch",
        element: <BranchCreation />,
      },
    ],
  },
  {
    path: "errors",
    errorElement: <ErrorPage />,
    children: [
      {
        path: "400",
        element: <Error400Page />,
      },
    ],
  },
]);

export default router;
