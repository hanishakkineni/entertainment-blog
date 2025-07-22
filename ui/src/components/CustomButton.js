import React from "react";

const CustomButton = ({
  type = "button",
  onClick,
  disabled = false,
  className = "",
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`custom-button ${className}`}
    >
      {children}
    </button>
  );
};

export default CustomButton;
