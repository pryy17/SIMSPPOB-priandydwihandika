import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { Button, FormInput, FormInputPassword } from "../../../atoms";
import { HiAtSymbol, HiOutlineLockClosed, HiUser } from "react-icons/hi";
import { register } from "../../../../services";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function RegisterForm() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      rePassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      password: Yup.string()
        .min(3, "Password must be 3 characters at minimum")
        .required("Password is required"),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Password confirmation  is required"),
    }),
    onSubmit: (values) => {
      const newValue = {
        email: values.email,
        first_name: values.firstName,
        last_name: values.lastName,
        password: values.password,
      };
      register(newValue)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Selamat!",
            text: "akunmu berhasil terdaftar",
          });
          navigate("/login");
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oopps!",
            text: "akunmu gagal terdaftar",
          });
        });
    },
  });
  return (
    <div className="w-full mx-[13em]">
      <form onSubmit={formik.handleSubmit}>
        <FormInput
          placeholder={"masukan email anda"}
          type="text"
          name="email"
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          value={formik.values.email}
          id="email"
          touched={formik.touched.email}
          errors={formik.errors.email}
          icon={<HiAtSymbol />}
        />
        <FormInput
          placeholder={"nama depan"}
          type="text"
          name="firstName"
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          value={formik.values.firstName}
          id="firstName"
          touched={formik.touched.firstName}
          errors={formik.errors.firstName}
          icon={<HiUser />}
        />
        <FormInput
          placeholder={"nama belakang"}
          type="text"
          name="lastName"
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          value={formik.values.lastName}
          id="lastName"
          touched={formik.touched.lastName}
          errors={formik.errors.lastName}
          icon={<HiUser />}
        />

        <FormInputPassword
          placeholder={"buat password"}
          type="password"
          name="password"
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          value={formik.values.password}
          id="password"
          touched={formik.touched.password}
          errors={formik.errors.password}
          icon={<HiOutlineLockClosed />}
        />
        <FormInputPassword
          placeholder={"konfirmasi password"}
          type="password"
          name="rePassword"
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          value={formik.values.rePassword}
          id="rePassword"
          touched={formik.touched.rePassword}
          errors={formik.errors.rePassword}
          icon={<HiOutlineLockClosed />}
        />
        <div className="mt-12 mb-8">
          <Button text="Daftar" />
        </div>

        <p>
          sudah punya akun? login
          <Link to="/login" className="text-red-700 font-medium">
            {" "}
            di sini
          </Link>
        </p>
      </form>
    </div>
  );
}
