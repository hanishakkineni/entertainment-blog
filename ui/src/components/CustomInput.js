import React from "react";

const CustomInput = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
  className = "",
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`input-field ${error ? "error" : ""} ${className}`}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default CustomInput;
