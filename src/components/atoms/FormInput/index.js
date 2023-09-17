import React from "react";

export default function FormInput({
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
  ...props
}) {
  return (
    <div className="flex-col mt-10 text-left">
      {label && <p className="mb-2 text-base font-medium">{label}</p>}
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
          type={type}
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
          placeholder={placeholder}
          {...props}
        />
      </div>

      {touched && errors ? (
        <div className="flex text-red-700">{errors}</div>
      ) : null}
    </div>
  );
}
