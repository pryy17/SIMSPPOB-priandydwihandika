import React, { useEffect, useState } from "react";
import Services from "./Services";
import Promo from "./Promo";
import { getBanner, getServices } from "../../../services";

export default function Home() {
  const [services, setServices] = useState();
  const [banner, setBanner] = useState();
  const token = localStorage.getItem("token");

  useEffect(() => {
    getServices()
      .then((res) => {
        setServices(res.data.data);
      })
      .catch((err) => {});
    getBanner()
      .then((res) => {
        setBanner(res.data.data);
      })
      .catch((err) => {});
  }, [token]);
  return (
    <div>
      <div className="mt-20">
        <Services data={services} />
      </div>

      <div className="mt-20">
        <Promo data={banner} />
      </div>
    </div>
  );
}
