import React from "react";
import logo from "../../assets/PinnacleLogo.png";

function Footer() {
  return (
    <footer className="bg-white rounded-lg p-4">
      <div className="w-full max-w-screen-xl mx-auto pt-4">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://sspinnacle.com/"
            className="flex items-center justify-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-6" alt="Logo" />
          </a>
          <ul className="flex flex-wrap justify-center my-3 items-center text-sm font-medium text-gray-500">
            <span className="block text-sm text-gray-500 sm:text-center">
              © 2024{" "}
              <a href="https://sspinnacle.com" className="hover:underline">
                Pinnacle Smart Solutions
              </a>
              . All Rights Reserved.
            </span>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
