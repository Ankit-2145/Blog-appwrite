import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet, useLocation } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const location = useLocation();

  // Define routes where header and footer should not be shown
  const noHeaderFooterRoutes = ["/Users"];

  // Determine if current route should hide header and footer
  const shouldHideHeaderFooter = noHeaderFooterRoutes.includes(
    location.pathname
  );

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between">
      <div className="w-full block">
        {!shouldHideHeaderFooter && <Header />}
        <main>
          <Outlet />
        </main>
        {!shouldHideHeaderFooter && <Footer />}
      </div>
    </div>
  ) : "Loading...";
}

export default App;
