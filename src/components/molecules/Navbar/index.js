import React from "react";
import logo from "../../../assets/image/Logo.png";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const path = useLocation().pathname;
  return (
    <div>
      <div className="flex justify-center items-center py-5 border-b-2 w-full font-medium">
        <Link
          to="homepage"
          className="mr-auto md:ml-[16em] flex justify-center items-center"
        >
          <div className="mr-2">
            <img src={logo} className="w-7" alt="logo" />
          </div>
          SIMS PPOB
        </Link>
        <div className="grid grid-cols-3 md:w-[30em] md:mr-28">
          <Link to="topup">
            <p className={path === "/topup" ? "text-red-600" : null}>Top Up</p>
          </Link>
          <Link to="transaction">
            <p className={path === "/transaction" ? "text-red-600" : null}>
              Transaction
            </p>
          </Link>
          <Link to="account">
            <p className={path === "/account" ? "text-red-600" : null}>Akun</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
