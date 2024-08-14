import React from "react";

const InputComponent = ({
  type,
  value,
  placeholder,
  onChange,
  disabled,
  required,
  name,
}) => {
  return (
    <input
      type={type}
      value={value}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled}
      required={required}
    />
  );
};

export default InputComponent;
