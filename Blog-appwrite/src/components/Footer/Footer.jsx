import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <section className="relative top-full overflow-hidden bg-white py-8">
      <div className="container relative z-10 mx-auto px-4">
        <div className="-m-8 flex flex-wrap items-center justify-center">
          <div className="w-auto p-4">
            <a href="#">
              <div className="inline-flex items-center">
                <span className="ml-4 text-lg text-gray-500 font-medium">
                  Pinnacle Smart Solutions |
                </span>
              </div>
            </a>
          </div>
          <div className="w-auto p-8">
            <ul className="-m-5 flex flex-wrap justify-center items-center">
              <li>
                <a
                  className="inline-block text-white px-3 py-2 duration-200 hover:bg-white hover:text-blue-400 font-medium rounded-full"
                  href="#"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  className="inline-block text-white px-3 py-2 duration-200 hover:bg-white hover:text-blue-400 font-medium rounded-full"
                  href="#"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  className="inline-block text-white px-3 py-2 duration-200 hover:bg-white hover:text-blue-400 font-medium rounded-full"
                  href="#"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
