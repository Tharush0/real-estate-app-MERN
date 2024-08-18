import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute({ adminOnly }) {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) {
    return <Navigate to="/sign-in" />;
  }

  if (adminOnly && !currentUser.isAdmin) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
