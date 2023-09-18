import React, { useEffect, useState } from "react";
import { Navbar, Profile } from "../../molecules";
import { Outlet, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getBalance, getUserData } from "../../../services";
import { setDataBalance, setDataUser } from "../../../store/authSlice";

export default function ProfileBalance() {
  const token = localStorage.getItem("token");
  const [tokenJwt, setTokenJwt] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    setTokenJwt(token);
    if (tokenJwt) {
      getUserData()
        .then((res) => {
          dispatch(setDataUser(res.data.data));
        })
        .catch((err) => {});
      getBalance()
        .then((res) => {
          dispatch(setDataBalance(res.data.data.balance));
        })
        .catch((err) => {});
    }
  }, [dispatch, token, tokenJwt]);
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  } else {
    return (
      <div>
        <Navbar />
        <div className="mx-0 lg:mx-[10em]">
          <Profile />
          <Outlet />
        </div>
      </div>
    );
  }
}
