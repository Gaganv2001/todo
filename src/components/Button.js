import React from "react";
import "./style.css";

const Button = ({ onClick, loading }) => {
  return (
    <div
      onClick={!loading ? onClick : null}
      className={`bg-[#597EF7] w-4/6 py-3 flex flex-row items-center justify-center mt-4 ${
        loading ? "cursor-not-allowed" : "cursor-pointer hover:bg-[#4656b7]"
      } rounded-md transition duration-300 ease-in-out`}
    >
      {loading ? (
        <div className="loader"></div> // Add your loading indicator here
      ) : (
        <p className="text-white">Add</p>
      )}
    </div>
  );
};

export default Button;
