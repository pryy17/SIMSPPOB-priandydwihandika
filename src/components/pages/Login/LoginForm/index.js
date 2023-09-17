import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { Button, FormInput, FormInputPassword } from "../../../atoms";
import { HiAtSymbol, HiOutlineLockClosed } from "react-icons/hi";
import { login } from "../../../../services";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../../../store/authSlice";

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("required.")
        .min(8, "Password is too short - should be 8 chars minimum."),
    }),
    onSubmit: (values) => {
      login(values)
        .then((res) => {
          const token = res.data.data.token;
          dispatch(setToken(token));
          navigate("/homepage");
        })
        .catch((err) => {
          alert("gagal");
        });
    },
  });
  return (
    <div className="w-full md:mx-[13em]">
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
        <FormInputPassword
          placeholder={"masukan password anda"}
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
        <div className="my-12">
          <Button text="Masuk" />
        </div>

        <p>
          belum punya akun? registrasi
          <Link to="/register" className="text-red-700 font-medium">
            {" "}
            di sini
          </Link>
        </p>
      </form>
    </div>
  );
}
