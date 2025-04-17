import React from "react";

const Button = ({ children, bgClass = "bg-gradient-to-tr from-transparent via-[rgba(121,121,121,0.16)] to-transparent" }) => {
  return (
    <button
      className={`text-white hover:text-green-600 backdrop-blur-lg ${bgClass} rounded-md py-2 px-6 shadow hover:shadow-green-600 duration-700`}
    >
      {children}
    </button>
  );
};

export default Button;
