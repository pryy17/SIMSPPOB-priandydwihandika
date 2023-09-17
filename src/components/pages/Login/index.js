import React from "react";
import LoginForm from "./LoginForm";
import bgLogin from "../../../assets/image/Illustrasi Login.png";
import logo from "../../../assets/image/Logo.png";

export default function Login() {
  return (
    <div className="grid grid-cols-12">
      <div className="mt-[20vh] text-center w-full col-span-6">
        <div className="flex w-full justify-center">
          <div>
            <img src={logo} alt="logo" />
          </div>
          <h2 className="text-2xl font-medium ml-2">SIMS PPOB</h2>
        </div>

        <h1 className="mt-9 text-4xl font-semibold">
          Masuk atau buat akun <br /> untuk memulai
        </h1>
        <div className="mt-8 flex justify-center">
          <LoginForm />
        </div>
      </div>
      <div className="bg-cover w-full h-[100vh] overflow-hidden col-span-6">
        <img className="object-cover w-full h-full" src={bgLogin} alt="login" />
      </div>
    </div>
  );
}
