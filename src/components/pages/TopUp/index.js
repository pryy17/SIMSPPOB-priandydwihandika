import React, { useEffect, useState } from "react";
import { Button, FormInput } from "../../atoms";
import { useFormik, useFormikContext } from "formik";
import { FaMoneyBill } from "react-icons/fa";
import * as Yup from "yup";
import { dataListToUp } from "./listTopUp";
import { getBalance, postTopup } from "../../../services";
import { setDataBalance } from "../../../store/authSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import imgIcon from "../../../assets/image/Logo.png";
import { useNavigate } from "react-router-dom";

export default function TopUp() {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      count: count,
    },
    validationSchema: Yup.object({
      count: Yup.number()
        .required("isi terlebih dahulu")
        .min(10000, "minimal top up 10.000")
        .max(1000000, "melebihi batas maksimal top up 1.000.000"),
    }),
    onSubmit: (values) => {
      const topup = {
        top_up_amount: values.count,
      };

      Swal.fire({
        iconHtml: `<img class="w-32" src="${imgIcon}" alt="logo" />`,
        html: `<div><p>Anda yakin untuk Top Up sebesar</p><br/><h1 class="text-3xl font-medium">Rp.${values.count.toLocaleString(
          "id-ID"
        )}</h1></div>`,
        showDenyButton: true,
        confirmButtonText: "Ya, lanjutkan bayar",
        denyButtonText: `Batalkan`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          postTopup(topup)
            .then((res) => {
              Swal.fire({
                icon: "success",
                html: `<div><p>Top Up sebesar</p><br/><h1 class="text-3xl font-medium">Rp.${values.count.toLocaleString(
                  "id-ID"
                )}</h1><p>Berhasil !</p></div>`,
                confirmButtonText: "Kembali ke beranda",
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate("/homepage");
                }
              });
              getBalance()
                .then((res) => {
                  dispatch(setDataBalance(res.data.data.balance));
                })
                .catch((err) => {
                  alert(err);
                });
            })
            .catch((err) => {
              Swal.fire({
                icon: "error",
                html: `<div><p>Top Up sebesar</p><br/><h1 class="text-3xl font-medium">Rp.${values.count.toLocaleString(
                  "id-ID"
                )}</h1><p>Gagal !</p></div>`,
                confirmButtonText: "Kembali ke beranda",
              });
            });
        }
      });
    },
  });
  return (
    <div className="text-left">
      <div className="mt-12">
        <p className="text-2xl font-normal">Silahkan masukan,</p>
        <h1 className="text-4xl font-medium">Nominal Top Up</h1>
      </div>

      <div className="grid grid-cols-12">
        <div className="grid col-span-7">
          <form onSubmit={formik.handleSubmit}>
            <FormInput
              placeholder={"masukan nominal Top Up"}
              type="number"
              name="count"
              handleChange={(e) => {
                setCount(e.target.value);
              }}
              handleBlur={formik.handleBlur}
              value={formik.values.count}
              id="count"
              touched={formik.touched.count}
              errors={formik.errors.count}
              icon={<FaMoneyBill />}
            />
            {(formik.touched.count && formik.errors.count) || count === 0 ? (
              <div className="my-5">
                <Button disable={true} text="Top Up" />
              </div>
            ) : (
              <div className="my-5">
                <Button disable={false} text="Top Up" />
              </div>
            )}
          </form>
        </div>

        <div className="grid col-span-5 ml-7 mt-10 grid-cols-3 w-fit gap-2">
          {dataListToUp.map((item) => (
            <button
              key={item.id}
              className="border-2 h-fit w-24 py-2 rounded-sm hover:bg-red-500 hover:text-white font-medium"
              onClick={() => {
                setCount(item.value);
              }}
            >
              <p>{item.name}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
