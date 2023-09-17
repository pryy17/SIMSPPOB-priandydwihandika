import React, { useEffect, useState } from "react";
import imgIcon from "../../../assets/image/Logo.png";
import { Button, FormInput } from "../../atoms";
import * as Yup from "yup";
import { FaMoneyBill } from "react-icons/fa";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { getBalance, getServices, postTransaction } from "../../../services";
import Swal from "sweetalert2";
import { setDataBalance } from "../../../store/authSlice";
import { useDispatch } from "react-redux";

export default function ServicePayment() {
  const [service, setService] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      count: service.service_tariff,
    },
    validationSchema: Yup.object({
      count: Yup.number()
        .required("isi terlebih dahulu")
        .min(10000, "minimal top up 10.000")
        .max(1000000, "melebihi batas maksimal top up 1.000.000"),
    }),
    onSubmit: (values) => {
      const transaction = {
        service_code: service.service_code,
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
          postTransaction(transaction)
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
  const pathParam = useParams()?.paymentId;

  useEffect(() => {
    getServices().then((res) => {
      res.data.data.map((item) => {
        if (item.service_code === pathParam) {
          setService(item);
        }
        return item;
      });
    });
  }, []);
  return (
    <div className="text-left mt-20">
      <h1 className="text-lg font-medium">PemBayaran</h1>
      <div className="flex items-center">
        <img src={service.service_icon} alt="icon" />
        <strong className="text-xl ml-4">{service.service_name}</strong>
      </div>

      <div className="w-full">
        <form onSubmit={formik.handleSubmit}>
          <FormInput
            placeholder={"masukan nominal Top Up"}
            type="number"
            name="count"
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            value={formik.values.count}
            id="count"
            touched={formik.touched.count}
            errors={formik.errors.count}
            icon={<FaMoneyBill />}
          />

          <div className="my-5">
            <Button disable={false} text="Bayar" />
          </div>
        </form>
      </div>
    </div>
  );
}
