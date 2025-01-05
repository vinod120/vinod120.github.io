import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Admin from "../pages/Admin";
import SubAdmin from "../pages/SubAdmin";
import SuperAdmin from "../pages/SuperAdmin";
import AccessDenied from "../pages/AccessDenied";


// Public routes
export const publicRoutes = [
  {
    path: "/",
    element: Home,
  },
  {
    path: "/access-denied",
    element: AccessDenied,
  },
];

// Private routes
export const privateRoutes = [
  {
    path: "/dashboard",
    element: Dashboard,
    allowedRoles: ["SubAdmin", "Admin", "SuperAdmin"],
  },
  {
    path: "/admin",
    element: Admin,
    allowedRoles: ["Admin", "SuperAdmin"],
  },
  {
    path: "/subadmin",
    element: SubAdmin,
    allowedRoles: ["SubAdmin", "Admin", "SuperAdmin"],
  },
  {
    path: "/superadmin",
    element: SuperAdmin,
    allowedRoles: ["SuperAdmin", "SubAdmin"],
  },
];
