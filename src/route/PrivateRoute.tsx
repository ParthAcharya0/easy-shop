import { useAppSelector } from "@/redux/hooks";
import { Navigate, Outlet } from "react-router";

const PrivateRoute = () => {
  const isUserAuth = useAppSelector((state) => state.auth.isUserAuth);

  if (!isUserAuth) {
    return <Navigate to={"/login"} replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;
  