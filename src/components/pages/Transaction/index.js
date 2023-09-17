import React, { useEffect, useState } from "react";
import { getTransaction } from "../../../services";

export default function Transaction() {
  const [tsHistory, setTsHistory] = useState([]);
  const [tsShowLimit, setTsShowLimit] = useState(5);

  useEffect(() => {
    const param = { offset: 0, limit: tsShowLimit };
    getTransaction(param).then((res) => {
      const modifData = res.data.data.records.map((item) => {
        const dateObject = new Date(item.created_on);
        const tahun = dateObject.getFullYear();
        const bulan = dateObject.getMonth();
        const tanggal = dateObject.getDay();
        const jam = dateObject.getHours();
        const menit = dateObject.getMinutes();
        const detik = dateObject.getSeconds();

        return {
          tanggal: `${tanggal}/${bulan}/${tahun}`,
          waktuTerpisah: `${jam}:${menit}:${detik}`,
          ...item,
        };
      });
      setTsHistory(modifData);
    });
  }, [tsShowLimit]);
  return (
    <div className="mt-20 text-left">
      <h1 className="text-2xl font-medium">Semua Transaksi</h1>
      <div className="mt-8">
        {tsHistory?.map((item) => (
          <div
            className={`border-[1px] border-gray-300 px-6 py-4 rounded-md mb-4 ${
              item.transaction_type === "TOPUP"
                ? "text-green-400"
                : "text-red-500"
            } `}
            key={item.invoice_number}
          >
            <div className="flex justify-between">
              <strong className="font-medium text-2xl">
                {item.transaction_type === "TOPUP" ? "+" : "-"} Rp.
                {item?.total_amount.toLocaleString("id-ID")}
              </strong>
              <p className="text-sm font-medium">{item.description}</p>
            </div>
            <div className="flex text-sm font-light mt-2">
              <p className="mr-4">{item.tanggal}</p>
              <p>{item.waktuTerpisah} WIB</p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full my-10 text-center">
        <p
          className="text-red-700 font-medium cursor-pointer"
          onClick={() => {
            setTsShowLimit(tsShowLimit + 5);
          }}
        >
          Show More
        </p>
      </div>
    </div>
  );
}
