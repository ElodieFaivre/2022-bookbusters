import { Navigate, Outlet } from "react-router-dom";

const AuthenticatedRoute = ({ redirect, hasAccess, children }) => {
  if (!hasAccess) {
    return <Navigate to={redirect} />;
  }
  return children ? children : <Outlet />;
};

export default AuthenticatedRoute;
