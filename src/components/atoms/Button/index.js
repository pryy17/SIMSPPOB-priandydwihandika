import React from "react";

export default function Button({ text, disable, handleClick, color }) {
  return (
    <div>
      <button
        className={`w-full py-3 rounded-md text-center cursor-pointer ${
          disable === true
            ? "bg-red-200"
            : color === "white"
            ? "bg-white border-2 border-red-400"
            : "bg-red-500"
        }`}
        onClick={handleClick}
      >
        <p
          className={`${
            color === "white" ? "text-red-500" : "text-white"
          } font-medium text-center`}
        >
          {text}
        </p>
      </button>
    </div>
  );
}
