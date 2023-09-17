import React from "react";
import LoginPage from "../views/LoginPage";
import RegisterPage from "../views/RegisterPage";
import HomePage from "../views/HomePage";
import TopUpPage from "../views/TopUpPage";
import ServicePaymentPage from "../views/ServicePaymentPage";
import TransactionPage from "../views/TransactionPage";
import AccountPage from "../views/AccountPage";

const auth = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
];

const pageWithNavbar = [
  {
    path: "/account",
    element: <AccountPage />,
  },
];

const pageWithNavbarProfile = [
  {
    path: "/homepage",
    element: <HomePage />,
  },
  {
    path: "/topup",
    element: <TopUpPage />,
  },
  {
    path: "homepage/service-payment/:paymentId",
    element: <ServicePaymentPage />,
  },
  {
    path: "/transaction",
    element: <TransactionPage />,
  },
];

export { auth, pageWithNavbar, pageWithNavbarProfile };
