import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, FormInput } from "../../../atoms";
import * as Yup from "yup";
import { HiAtSymbol, HiUser } from "react-icons/hi";

export default function FormOnlyShow({ handleEdited, data, edited }) {
  const [dataUser, setDataUser] = useState(data);
  const navigate = useNavigate();

  useEffect(() => {
    setDataUser(data);
  }, [data]);
  const formik = useFormik({
    initialValues: {
      email: dataUser?.email,
      firstName: dataUser?.first_name,
      lastName: dataUser?.last_name,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
    }),
  });

  return (
    <div>
      <div className="w-full flex justify-center ">
        <div className="md:w-[35%] mt[6vh]">
          <section className="container flex justify-center relative">
            <div className="rounded-full overflow-hidden w-32 h-32 flex justify-center items-center cursor-pointer">
              <img
                className="w-full h-full"
                src={dataUser?.profile_image}
                alt="pprofile"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src =
                    "https://www.w3schools.com/w3images/avatar2.png";
                }}
              />
            </div>
          </section>
          <h1 className="font-medium text-3xl mt-5">Kristanto Wibowo</h1>
          <form onSubmit={formik.handleSubmit}>
            <FormInput
              placeholder={"masukan email anda"}
              type="text"
              name="email"
              value={formik.values.email || ""}
              id="email"
              icon={<HiAtSymbol />}
              label="Email"
              disabled={true}
            />
            <FormInput
              placeholder={"nama depan"}
              type="text"
              name="firstName"
              value={formik.values.firstName || ""}
              id="firstName"
              icon={<HiUser />}
              label="Nama Depan"
              disabled={true}
            />
            <FormInput
              placeholder={"nama belakang"}
              type="text"
              name="lastName"
              value={formik.values.lastName || ""}
              id="lastName"
              icon={<HiUser />}
              label="Nama Belakang"
              disabled={true}
            />
            <div className="mt-12 mb-5"></div>
            <div className="mt-5 mb-8">
              <Button
                color="white"
                disable={false}
                text="Edit Profile"
                handleClick={() => {
                  handleEdited(!edited);
                }}
              />
            </div>
          </form>
          <Button
            disable={false}
            text="Logout"
            handleClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          />
        </div>
      </div>
    </div>
  );
}
