import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Button, FormInput } from "../../atoms";
import { HiAtSymbol, HiPencil, HiUser } from "react-icons/hi";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import FormOnlyShow from "./FormOnlyShow";
import { getUserData, putImageUpload, putUpdateUser } from "../../../services";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const dataUserSelector = useSelector((item) => item.auth.userData);
  const [files, setFiles] = useState();
  const [filesError, setFilesError] = useState(null);
  const [isEdited, setIsEdited] = useState(false);
  const [dataUser, setDataUser] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getUserData()
      .then((res) => {
        dispatch(setDataUser(res.data.data));
        setDataUser(res.data.data);
      })
      .catch((err) => {});
  }, [dataUserSelector, dispatch, files]);

  // submit
  const formik = useFormik({
    initialValues: {
      email: dataUser.email,
      firstName: dataUser.first_name,
      lastName: dataUser.last_name,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      const updateUser = {
        first_name: values.firstName,
        last_name: values.lastName,
      };
      if (filesError === null) {
        putUpdateUser(updateUser)
          .then((res) => {
            Swal.fire("Berhasil!", "update data berhasil", "success");
            if (files) {
              let fd = new FormData();
              fd.append("file", files[0]);
              putImageUpload(fd)
                .then((res) => {
                  Swal.fire(
                    "Berhasil!",
                    "upload photo profile berhasil",
                    "success"
                  );
                  navigate("/homepage");
                })
                .catch((err) => {
                  Swal.fire("Gagal!", "upload photo profile gagal", "error");
                });
            }
            navigate("/homepage");
          })
          .catch((err) => {
            Swal.fire("Gagal!", "update data gagal", "error");
          });
      }
    },
  });

  // upload image
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) => {
          if (file.size <= 102400) {
            setFilesError(null);
            return Object.assign(file, {
              preview: URL.createObjectURL(file),
            });
          } else {
            setFilesError("melebihi kapasiatas 100 kb");
            return Object.assign(file, {
              preview: URL.createObjectURL(file),
            });
          }
        })
      );
    },
  });

  const thumbs = files?.map((file) => (
    <div>
      <img
        src={file.preview}
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
        alt=""
      />
    </div>
  ));
  return isEdited ? (
    // show edit
    <div className="w-full flex justify-center ">
      <div className="md:w-[35%] mt[6vh]">
        <section className="container flex justify-center relative">
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <div className="rounded-full overflow-hidden w-32 h-32 flex justify-center items-center cursor-pointer">
              {files ? (
                <div>{thumbs}</div>
              ) : (
                <img
                  className="w-full h-full"
                  src={dataUser.profile_image}
                  alt="pprofile"
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src =
                      "https://www.w3schools.com/w3images/avatar2.png";
                  }}
                />
              )}
            </div>
            <div className="absolute md:right-[18em] bottom-1 rounded-full w-7 h-7 bg-white flex justify-center items-center border-2 cursor-pointer">
              <HiPencil className="text-lg" />
            </div>
          </div>
        </section>
        {filesError && (
          <p className="text-red-600 font-extralight">{filesError}</p>
        )}
        <h1 className="font-medium text-3xl mt-5">{`${dataUser?.first_name} ${dataUser?.last_name}`}</h1>
        <form onSubmit={formik.handleSubmit}>
          <FormInput
            placeholder={"masukan email anda"}
            type="text"
            name="email"
            value={formik.values.email}
            id="email"
            icon={<HiAtSymbol />}
            label="Email"
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
            label="Nama Depan"
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
            label="Nama Belakang"
          />
          <div className="mt-12 mb-5">
            <Button
              text="Simpan"
              // handleClick={() => {
              //   setIsEdited(!isEdited);
              // }}
            />
          </div>
          <div className="mt-5 mb-5">
            <Button
              color="white"
              text="Batalkan"
              handleClick={() => {
                setIsEdited(!isEdited);
              }}
            />
          </div>
        </form>
      </div>
    </div>
  ) : (
    // only show
    <div>
      <FormOnlyShow
        data={dataUser}
        handleEdited={setIsEdited}
        edited={isEdited}
      />
    </div>
  );
}
