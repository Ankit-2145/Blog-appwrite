import React from "react";
import logo from "../assets/PinnacleLogo.png";

const Logo = () => {
  return (
    <div>
      <img src={logo} className="w-24 pt-2 my-auto hidden sm:block" alt="logo" />
    </div>
  );
};

export default Logo;
