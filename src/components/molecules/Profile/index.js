import React, { useEffect, useState } from "react";
import bgSaldo from "../../../assets/image/Background Saldo.png";
import photoProfile from "../../../assets/image/Profile Photo.png";
import { HiEye } from "react-icons/hi";
import { useSelector } from "react-redux";
import loading from "../../../assets/loading.svg";

export default function Profile() {
  const userData = useSelector((data) => data.auth.userData);
  const userBalance = useSelector((data) => data.auth.userBalance);
  const [isVisible, setIsvisible] = useState(false);
  const [balance, setBalance] = useState(userBalance);

  useEffect(() => {
    setBalance(userBalance);
  }, [userBalance]);

  if (userData) {
    <div>{loading}</div>;
  }
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-12 mt-8 overflow-hidden">
        {/* profile */}
        <div className="grid md:col-span-5 text-center md:text-left justify-items-center md:justify-items-start">
          <div className="rounded-full overflow-hidden w-20 h-20">
            <img
              className="w-20"
              src={userData?.profile_image}
              alt="photoprofile"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src =
                  "https://www.w3schools.com/w3images/avatar2.png";
              }}
            />
          </div>
          <div>
            <p className="text-2xl font-normal">Selamat datang,</p>
            <h1 className="text-4xl font-medium">{`${userData?.first_name} ${userData?.last_name}`}</h1>
          </div>
        </div>

        {/* jumlah saldo */}
        <div className="grid md:col-span-7 md:justify-items-end mt-9 md:mt-0">
          <div
            className="flex-col text-left bg-no-repeat min-h-[10.3em] w-fit md:w-[42.1em] px-5 py-6"
            style={{ backgroundImage: `url(${bgSaldo})` }}
          >
            <p className="text-white font-medium">Saldo anda</p>
            <div className="flex items-center">
              <h1 className="text-3xl font-medium text-white mr-3">Rp</h1>
              <input
                className="text-3xl font-medium text-white my-2 bg-transparent"
                type={isVisible ? "text" : "password"}
                value={balance?.toLocaleString("id-ID")}
                disabled
              />
            </div>
            <div
              className="mt-4 text-white text-sm flex items-center"
              onClick={() => setIsvisible(!isVisible)}
            >
              lihat saldo <HiEye className="ml-3 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
