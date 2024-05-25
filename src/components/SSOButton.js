import React from "react";
import google from "../assets/images/google.png";
const SSOButton = (onClick) => {
  return (
    <div className="bg-[#597EF7] w-7/12 p-1 flex flex-row items-center gap-6">
      <div className="bg-white p-0 rounded">
        <img
          loading="lazy"
          src={google}
          alt="cover"
          style={{ objectFit: "contain" }}
        />
      </div>

      <p className="text-white">Sign in using Google</p>
    </div>
  );
};

export default SSOButton;
