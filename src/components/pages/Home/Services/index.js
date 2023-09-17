import React, { useEffect, useState } from "react";
import listrik from "../../../../assets/image/Listrik.png";
import { Link } from "react-router-dom";

export default function Services({ data }) {
  return (
    <div>
      <div className="grid grid-cols-3 sm:grid-cols-9 justify-items-center">
        {data?.map((item) => (
          <Link to={`service-payment/${item.service_code}`} key={item.service_code}>
            <div className="w-20 font-medium cursor-pointer flex-col justify-center items-center whitespace-pre-wrap">
              <img
                className="w-20 mb-2"
                src={item.service_icon}
                alt="listrik"
              />
              <p className="whitespace-pre-wrap text-sm">{item.service_name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
