import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthGoogleContext } from "../contexts/authGoogle";

export const PrivateRoutes = () => {
  const { isLoggedIn } = useContext(AuthGoogleContext);

  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};
