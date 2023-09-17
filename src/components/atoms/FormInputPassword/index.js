import React, { useState } from "react";
import { HiEye } from "react-icons/hi";

export default function FormInputPassword({
  label,
  name,
  id,
  handleChange,
  handleBlur,
  value,
  type,
  touched,
  errors,
  icon,
  placeholder,
}) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="flex-col mt-10">
      {label && <label htmlFor="firstName">{label}</label>}
      <div
        className={`flex items-center border-2 rounded-md ${
          touched && errors ? "border-red-700" : null
        }`}
      >
        {icon && (
          <p className={`text-2xl opacity-20 pl-2 ${value && "opacity-75"}`}>
            {icon}
          </p>
        )}
        <input
          className="border-0 border-l-0 w-full py-3 pl-1 focus:outline-none"
          style={{ backgroundColor: "transparent" }}
          id={id}
          name={name}
          type={isVisible ? "text" : type}
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
          placeholder={placeholder}
        />

        <p
          className={`text-2xl opacity-20 mr-2 cursor-pointer pl-2 ${
            value && "opacity-75"
          }`}
          onClick={() => setIsVisible(!isVisible)}
        >
          <HiEye />
        </p>
      </div>

      {touched && errors ? (
        <div className="flex text-red-700">{errors}</div>
      ) : null}
    </div>
  );
}
