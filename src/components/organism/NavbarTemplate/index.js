import React, { useEffect } from "react";
import { Navbar } from "../../molecules";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDataUser } from "../../../store/authSlice";
import { getUserData } from "../../../services";

export default function NavbarTemplate() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      getUserData()
        .then((res) => {
          dispatch(setDataUser(res.data.data));
        })
        .catch((err) => {});
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  } else {
    return (
      <div>
        <Navbar />
        <Outlet />
      </div>
    );
  }
}
