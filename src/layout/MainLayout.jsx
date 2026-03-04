import { Outlet, useLocation } from "react-router-dom";
import Navbar from '../components/Navbar';
import { useAuth } from "../context/useAuth";
import Spinner from "../components/Spinner";

function MainLayout() {
  const { authLoading, user } = useAuth();
  const location = useLocation();

  if (authLoading) {
    return (
      <div className="page">
        <Spinner />
      </div>
    );
  }

  const hideNav = !user && (location.pathname === "/login" || location.pathname === "/signup");

  return (
    <div className="app-shell">
      {!hideNav && <Navbar />}
      <div className="page">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
