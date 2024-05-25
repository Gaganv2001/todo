import React from "react";

const TextInput = ({ value, placeholder, onChange }) => {
  return (
    <input
      className="border-2  placeholder-black py-3 px-2 w-5/6 my-4"
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      style={{ color: "black" }}
    />
  );
};

export default TextInput;
 