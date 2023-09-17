import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function Auth() {
  const token = localStorage.getItem("token");
  const path = useLocation().pathname;
  if (token) {
    return <Navigate to="/homepage" replace={true} />;
  } else {
    if (path === "/") {
      return <Navigate to="/login" replace={true} />;
    } else {
      return <Outlet />;
    }
  }
}
